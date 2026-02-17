import { Router } from "express"
import { Index } from "../../html/class/main";
import { Print } from "../../html/class/print";
import { readId, readIds } from "../../controller";
import { List } from "../../html/class/list";
export const pagesRoutes = Router();

// Get all echantillons
pagesRoutes.get("/index", async (req, res) => {
    const html = new Index();
    res.send(html.toString())
});

pagesRoutes.get("/sites.html", async (req, res) => {
    const html = new List("Site");
    res.send(html.toString())
});

pagesRoutes.get("/passeports.html", async (req, res) => {
    const html = new List("Passeport");
    res.send(html.toString())
});
pagesRoutes.get("/echantillons.html", async (req, res) => {
    const html = new List("Echantillon", true);
    res.send(html.toString())
});

pagesRoutes.get("/print/:type/:id", async (req, res) => {
    switch (req.params.type ) {
        case 'echantillon':
            return await readId("echantillons",  +req.params.id).then((echantillon: any) => {
                const html = new Print("echantillon", echantillon);
                res.set('Content-Type', 'text/html').send(html.toString())
            }).catch (error => {
                return res.status(404).json({"error": error.detail});
            });  
        case 'selection':
            return await readId("selections",  +req.params.id).then(async (selection: any) => {
                return await readIds("echantillons", selection[0].ids).then(async (all: any) => {
                        const html = new Print("echantillon", all);
                        res.set('Content-Type', 'text/html').send(html.toString())
                }).catch (error => {
                return res.status(404).json({"error": error.detail});
                });
            }).catch (error => {
                return res.status(404).json({"error": error.detail});
            });   
        case 'passeport':
            return await readId("passeports",  +req.params.id).then((passeport: any) => {
                console.log(passeport);
                const html = new Print("passeport", passeport);
                res.set('Content-Type', 'text/html').send(html.toString())
            }).catch (error => {
                return res.status(404).json({"error": error.detail});
            });               
        default:
            break;
    };

});


