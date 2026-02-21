import { createPgValues, executeSql, getColumns, sql } from "../../db";
import path from "path";
import fs from "fs";

export async function readConfig() {
      return await sql`SELECT * FROM configuration WHERE id = 1`
};

export function writeConfigurationFile(configuration: any) {
      fs.writeFile(
            path.resolve(__dirname, "../../public/js/", "configuration.js"),
            `_CONFIGURATION = ${JSON.stringify(configuration).split(',').join(",\n")}`,
            (error) => {
                  console.log(`Ecriture de la configuration : ${error}`);                
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
      .then(async res => {
            writeConfigurationFile(res);
            return await sql`SELECT * FROM configuration WHERE id = 1`
      })

};