    // ########################################################
    // #                      PASSEPORTS                      #
    // ########################################################

import { Router } from "express"
import { deleteId, readAll, readAlSearch, readId, verifyBody } from "../../controller";
import { addEvenement, updateEvenement } from "./controller";

export const evenementsRoutes = Router();

    // Get all sites
    evenementsRoutes.get("/evenements", async (req, res)  => {
      if(req.query.search)
        return await readAlSearch("evenements", String(req.query.search)).then((site: any) => {
      return res.status(200).json(site);
    }).catch (error => {
      return res.status(404).json({"error": error.detail});
    });  else return await readAll("evenements").then((site: any) => {
      return res.status(200).json(site);
    }).catch (error => {
      return res.status(404).json({"error": error.detail});
    });
  });
    

    // Get one site
    evenementsRoutes.get("/evenement/:id", async (req, res)  => {
      return await readId("sites",  +req.params.id).then((site: any) => {
        return site.length > 0 
        ? res.status(200).json(site[0])
        : res.status(404).json({"code":404,"error":"Not Found"});
      }).catch (error => {
        return res.status(404).json({"error": error.detail});
      });
    });  
  
    
    // Create one site
    evenementsRoutes.post("/evenement", async (req, res)  => {
      const values = verifyBody(req.body);
      if(values) {
        return await addEvenement(values).then((site: any) => {
          return res.status(201).json(site);
        }).catch (error => {
          return res.status(error.code === 23505 ? 409 : 404).json({"error": error.detail});
        });
      } else res.status(400).json({"code" : 400, "error" : "Bad Request"});
    });


    // Update one site
    evenementsRoutes.patch("/evenement/:id", async (req, res)  => {
      return await updateEvenement(req.body,  +req.params.id).then((site: any) => {
        return res.status(201).json(site);
      }).catch (error => {
        return res.status(404).json({"error": error.detail});
      });
    });

    // delete one site
    evenementsRoutes.delete("/site/:id", async (req, res)  => {
      return await deleteId("evenement",  +req.params.id).then((nothing: any) => {
        return res.status(203).json();
      }).catch (error => {
        return res.status(404).json({"error": error.detail});
      });
    });