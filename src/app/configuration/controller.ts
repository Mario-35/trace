import { createPgValues, executeSql, getColumns, sql } from "../../db";
import path from "path";
import fs from "fs";
import { dataBase } from "../../db/base";

export async function readConfig() {
      return await sql`SELECT * FROM configuration WHERE id = 1`
};

export function writeConfigurationFile(configuration: any) {
      configuration["excelColumns"] = Object.keys(dataBase.echantillons.columns).filter(e => dataBase.echantillons.columns[e].excel);
      configuration["stickerElements"] = JSON.parse(`{"echantillon": 0, ${Object.keys(dataBase.echantillons.columns).filter(e => dataBase.echantillons.columns[e].etiquette).map(e => `"${e}" : "${dataBase.echantillons.columns[e].etiquette}"`)}}`);

      fs.writeFile(
            path.resolve(__dirname, "../../public/js/", "configuration.js"),
            `_CONFIGURATION = ${JSON.stringify(configuration).split(',').join(",\n")}`,
            (error) => {
                  console.log(`Ecriture de la configuration : ${error || "Ok"}`);                
            }
      );
}

export async function writeConfig() {
      executeSql(`SELECT * FROM configuration WHERE id = 1`).then((configuration: any) => {
            writeConfigurationFile(configuration[0]);
      });
}

export async function saveConfig(values: any) {
      const cols = getColumns("configuration");
      const datas = cols.filter(e => values[e]);
      return await executeSql(`INSERT INTO configuration (${datas.join()}) VALUES (${createPgValues("configuration", values)})`)
      .then(async () => await writeConfig())
};