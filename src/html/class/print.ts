/**
 * HTML Print for API.
 *
 * @copyright 2026-present Inrae
 * @author mario.adam@inrae.fr
 *
 */

import { CoreHtmlView } from "./core";

/**
 * Print Class for HTML View
 */

export class Print extends CoreHtmlView {
    datas: any;
    constructor(type: "echantillon" | "passeport", datas: any) {
        super();
        this.datas = datas;
        if (type === "echantillon") 
            this.createPrintEchantillonHtmlString();
        else if (type ===  "passeport") 
            this.createPrintPasseportHtmlString()
    }
   
    createPrintPasseportHtmlString() {
        this._HTMLResult = ['<!DOCTYPE html>',
                            '<html lang="en">',
                            '<head>',
                            '<meta charset="UTF-8">',
                            '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
                            '<title>Impression des passeports</title>',
                            '<link rel="stylesheet" href="./css/print.css">',
                            '<link rel="stylesheet" href="./css/passeport.css">',
                            '</head>',
                            '<body>',
                            '<div class="content" id="passeportsContent"></div>',
                            '</body> ',
                            '<script>',
                            `_DATAPI = ${JSON.stringify(this.datas)}`,
                            '</script>',
                            '<script src="./js/constants.js"></script>',
                            '<script src="./js/api/print.js"></script>',
                            '<script>start()</script>',
                            '</html>'].map((e: string) => e.trim());
        this.replaceFile("css/print.css");
        this.replaceFile("css/passeport.css");
        this.replaceFile("js/constants.js");
        this.replaceFile("js/api/print.js");
    }

    createPrintEchantillonHtmlString() {
        this._HTMLResult = ['<!DOCTYPE html>',
                            '<html lang="en">',
                            '<head>',
                            '<meta charset="UTF-8">',
                            '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
                            '<title>Gestion des étiquettes</title>',
                            '<link rel="stylesheet" href="./css/print.css">',
                            '<link rel="stylesheet" href="./css/echantillon.css">',
                            '</head>',
                            '<body>',
                            '<div class="content" id="echantillonsContent"></div>',
                            '</body> ',
                            '<script>',
                            `_DATAPI = ${JSON.stringify(this.datas)}`,
                            '</script>',
                            '<script src="./js/constants.js"></script>',
                            '<script src="./js/libs/JsBarcode.all.min.js"></script>',
                            '<script src="./js/api/print.js"></script>',
                            '<script>start()</script>',
                            '</html>'].map((e: string) => e.trim());
        this.replaceFile("css/print.css");
        this.replaceFile("css/echantillon.css");
        this.replaceFile("js/constants.js");
        this.replaceFile("js/api/print.js");
        this.replaceFile("js/libs/JsBarcode.all.min.js");
    }

    toString() {
        return super.toString();
    }
}
