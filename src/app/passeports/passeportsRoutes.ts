    // ########################################################
    // #                      PASSEPORTS                      #
    // ########################################################

import { Router } from "express"
import { deleteId, readAll, readAlSearch, readId, verifyBody } from "../../controller";
import { addPasseport, updatePasseport } from "./controller";

export const passeportssRoutes = Router();

    // Get all passeports
    passeportssRoutes.get("/passeports", async (req, res)  => {
      if(req.query.search)
        return await readAlSearch("passeports", String(req.query.search)).then((passeport: any) => {
      return res.status(200).json(passeport);
    }).catch (error => {
      return res.status(404).json({"error": error.detail});
    });  else return await readAll("passeports").then((passeport: any) => {
      return res.status(200).json(passeport);
    }).catch (error => {
      return res.status(404).json({"error": error.detail});
    });
  });
    

    // Get one passeport
    passeportssRoutes.get("/passeport/:id", async (req, res)  => {
      return await readId("passeports",  +req.params.id).then((passeport: any) => {
        return passeport.length > 0 
        ? res.status(200).json(passeport[0])
        : res.status(404).json({"code":404,"error":"Not Found"});
      }).catch (error => {
        return res.status(404).json({"error": error.detail});
      });
    });  

    // Create one passeport
    passeportssRoutes.post("/passeport", async (req, res)  => {
      const values = verifyBody(req.body);
      if(values) {
        return await addPasseport(values).then((passeport: any) => {
          return res.status(201).json(passeport[0]);
        }).catch (error => {
          console.log(error);
          return res.status(error.code === 23505 ? 409 : 404).json({"error": error.detail});
        });
      } else res.status(400).json({"code" : 400, "error" : "Bad Request"});
    });

    // Update one passeport
    passeportssRoutes.patch("/passeport/:id", async (req, res)  => {
      return await updatePasseport(req.body,  +req.params.id).then((passeport: any) => {
        return res.status(201).json(passeport);
      }).catch (error => {
        return res.status(404).json({"error": error.detail});
      });
    });

    // delete one passeport
    passeportssRoutes.delete("/passeport/:id", async (req, res)  => {
      return await deleteId("passeports",  +req.params.id).then((nothing: any) => {
        return res.status(203).json();
      }).catch (error => {
        return res.status(404).json({"error": error.detail});
      });
    });