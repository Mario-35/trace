import { Router } from "express"
import { deleteId, readId } from "../../controller"
import { sql } from "../../db"
import { addEchantillon, readEchantillons, updateEchantillon } from "./controller";


export const echantillonsRoutes = Router();


// Get all echantillons
echantillonsRoutes.get("/echantillons", async (req, res) => {
    const passeports = await readEchantillons();
    res.status(200).json(passeports)
})

// Get all echantillons with passport id
echantillonsRoutes.get("/echantillons/:id", async (req, res) => {
    const passeports = await readEchantillons(+req.params.id);
    res.status(200).json(passeports)
})

// Get one echantillon
echantillonsRoutes.get("/echantillon/:id", async (req, res) => {
    return await readId("echantillons",  +req.params.id).then((echantillon: any) => {
    return echantillon.length > 0 
        ? res.status(200).json(echantillon[0])
        : res.status(404).json({"code":404,"error":"Not Found"});
    }).catch (error => {
    return res.status(404).json({"error": error.detail});
    });
})

// Get next echantillon numériotation
echantillonsRoutes.get("/echantillon/after/:id", async (req, res) => {
    return await sql`select MAX(SUBSTRING (identification FROM 13 FOR 4)::int) from echantillons where identification like CONCAT((select SUBSTRING (identification FROM 1 FOR 12) from echantillons where id = ${+req.params.id}), '%')`.then((max: any) => {
    return res.status(200).json(Number(max[0].max) + 1);
    }).catch (error => {
    return res.status(404).json({"error": error.detail});
    });
})

// Create one echantillon
echantillonsRoutes.post("/echantillon", async (req, res) => {
    return await addEchantillon(req.body).then((echantillon: any) => {
    return res.status(201).json(echantillon);
    }).catch (error => {
    return res.status(error.code === 23505 ? 409 : 404).json({"error": error.detail});
    });
})

// Update one echantillon
echantillonsRoutes.patch("/echantillon/:id", async (req, res) => {
    const echantillon = await updateEchantillon(req.body,  +req.params.id);
    res.status(201).json(echantillon)
}); 

// delete one echantillon
echantillonsRoutes.delete("/echantillon/:id", async (req, res) => {
    return await deleteId("echantillons",  +req.params.id).then((nothing: any) => {
    return res.status(203).json();
    }).catch (error => {
    return res.status(404).json({"error": error.detail});
    });
});