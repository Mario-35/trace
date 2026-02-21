import { Router } from "express"
import { readConfig, saveConfig } from "./controller";


export const configRoutes = Router();


// Get all config
configRoutes.get("/configuration", async (req, res) => {
    return await readConfig().then((configuration: any) => {
        return configuration.length > 0 
            ? res.status(200).json(configuration[0])
            : res.status(404).json({"code":404,"error":"Not Found"});
    }).catch (error => {
        return res.status(404).json({"error": error.detail});
    });    
})

// Create one echantillon
configRoutes.post("/configuration", async (req, res) => {
    return await saveConfig(req.body).then((echantillon: any) => {
        return res.status(201).json(echantillon);
    }).catch (error => {
        return res.status(error.code === 23505 ? 409 : 404).json({"error": error.detail});
    });
})

// Update one echantillon
configRoutes.patch("/configuration", async (req, res) => {
    const echantillon = await saveConfig(req.body);
    res.status(201).json(echantillon)
}); 
