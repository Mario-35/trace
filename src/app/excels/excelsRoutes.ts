import { Router } from "express"
import { readId } from "../../controller";
import { addExcel } from "./controller";


export const excelsRoutes = Router();

excelsRoutes.get("/excel/:id", async (req, res) => {
    return await readId("excels",  +req.params.id).then((excel: any) => {
    return excel.length > 0 
        ? res.status(200).json(excel[0].datas)
        : res.status(404).json({"code":404,"message":"Not Found"});
    }).catch (error => {
    return res.status(404).json({"error": error.detail});
    });
})

excelsRoutes.post("/excel", async (req, res) => {
    return await addExcel(req.body).then((excel: any) => {
    return res.status(201).json(excel);
    }).catch (error => {
    return res.status(error.code === 23505 ? 409 : 404).json({"error": error.detail});
    });
})