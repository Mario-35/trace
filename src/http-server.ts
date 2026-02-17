import express, { Request, Response, Express } from "express";
import cors from "cors";
import helmet from "helmet";
import multer from "multer";
import compression from "compression";
import path from "path";
import { logger } from "@infra/logger";
import { getRpg } from "./helpers/getRpg"
import { addExcel, addSelection, getConfiguration, readId, readIds, setConfiguration, verifyBody } from "./controller";
import {  HELMET } from "./constant";
import { sql } from "./db";
import { createDB } from "./helpers/createDB";
import { echantillonsRoutes, pagesRoutes, passeportsRoutes, sitesRoutes } from "./app";



export default class HttpServer {
  private app: Express;
  
  storage: multer.StorageEngine;
  upload: multer.Multer;
  _datas: any;

  constructor() {
    this.app = express();
    this.storage = multer.memoryStorage();
    this.upload = multer({ storage: this.storage });    
  }

  async createApp(): Promise<Express> {
    this.loadMiddlewares();
    // this.loadPages();
    this.loadRoutes();
    return this.app;
  }

  async stop(): Promise<void> {
    logger.info("Arret..");
  }

  private loadMiddlewares(): void {
    this.app.use(cors());
    this.app.use( helmet(HELMET) );
    this.app.use(express.json({limit: '50mb'}));
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());
  }
  
  private loadRoutes(): void {

    this.app.use('/', echantillonsRoutes);
    this.app.use('/', passeportsRoutes);
    this.app.use('/', sitesRoutes);
    this.app.use('/', pagesRoutes);
    
    this.app.get("/", async (_req: Request, res: Response) => {
      res.json({
        message: "Serveur actif...",
      })
    })
        // Get test
    this.app.get("/init/:password", async (_req: Request, res: Response) => {
      res.status(200).json(createDB(_req.params["password" as keyof object]))
      
    })

    // ########################################################
    // #                        FILES                         #
    // ########################################################

    // Route to upload an image
    this.app.post('/upload', this.upload.single('image'), async (_req: Request, res: Response) => {
      if(_req.file)
        try {
            const imageBuffer = _req.file.buffer;
            const filename = _req.file.originalname;
            const result = await sql.unsafe('INSERT INTO fichiers (fichier, nom) VALUES ($1, $2) RETURNING id',
                [imageBuffer, filename]
            );
            res.json(result[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error uploading file');
        }
    });

    this.app.get("/download/:id", async (_req: Request, res: Response) => {
      return await await sql.unsafe(`SELECT fichier FROM fichiers WHERE id = ${ +_req.params.id }`).then((fichier: any) => {
        return res.status(200).json(fichier);
      }).catch (error => {
        return res.status(404).json({"error": error.detail});
      });
    })

    this.app.get("/excel/:id", async (_req: Request, res: Response) => {
      return await readId("excels",  +_req.params.id).then((excel: any) => {
        return excel.length > 0 
          ? res.status(200).json(excel[0].datas)
          : res.status(404).json({"code":404,"message":"Not Found"});
      }).catch (error => {
        return res.status(404).json({"error": error.detail});
      });
    })
    
    this.app.post("/excel", async (_req: Request, res: Response) => {
      return await addExcel(_req.body).then((excel: any) => {
        return res.status(201).json(excel);
      }).catch (error => {
        return res.status(error.code === 23505 ? 409 : 404).json({"error": error.detail});
      });
    })
    
    // return the status server
    this.app.get("/status", async (_req: Request, res: Response) => {
      res.status(200).json({
        status: "Serveur actif",
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      })
    })

    // Get all rpg
    this.app.get("/rpg", async (_req: Request, res: Response) => {
      const tmp = _req.url.split("?pos=")[1].split(",");
      return await getRpg(tmp[0] ,tmp[1]).then((rpg: any) => {
        return res.status(200).json(rpg);
      }).catch (error => {
        return res.status(404).json({"error": error.detail});
      });
    });
    


    // ########################################################
    // #                    CONFIGURATION                     #
    // ########################################################
   this.app.post("/configuration", async (_req: Request, res: Response) => {
      const values = verifyBody(_req.body);
      if(values) {
        return await setConfiguration(values).then((configuration: any) => {
          return res.status(201).json(configuration);
        }).catch (error => {
          return res.status(error.code === 23505 ? 409 : 404).json({"error": error.detail});
        });
      } else res.status(400).json({"code":400,"error":"Bad Request"});
    })

    this.app.get("/configuration", async (_req: Request, res: Response) => {
      return await getConfiguration().then((configuration: any) => {
        return res.status(200).json(configuration[0].params);
      }).catch (error => {
        return res.status(404).json({"error": error.detail});
      });
    });  

    // ########################################################
    // #                      selection                       #
    // ########################################################

    // Get selection
    this.app.get("/selection/:id", async (_req: Request, res: Response) => {
      return await readId("selections",  +_req.params.id).then(async (selection: any) => {
        return await readIds("echantillons", selection[0].ids).then(async (all: any) => {
          return res.status(200).json(all);
        }).catch (error => {
          return res.status(404).json({"error": error.detail});
        });
      }).catch (error => {
        return res.status(404).json({"error": error.detail});
      });
    });
    
    // Create one selection
    this.app.post("/selection", async (_req: Request, res: Response) => {
      return await addSelection(_req.body.ids).then((selection: any) => {
        return res.status(201).json(selection);
      }).catch (error => {
        return res.status(error.code === 23505 ? 409 : 404).json({"error": error.detail});
      });
    })


    this.app.use((req: Request, res: Response) => {
      res.status(404).json({
        error: {
          code: "ENDPOINT_NOT_FOUND",
          message: "Endpoint not found",
          path: req.originalUrl,
        }
      })
    })
  }

}

