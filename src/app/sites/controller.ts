
import { createPgValues, executeSql, getColumns, sql } from "../../db";
import { dataBase } from "../../db/base";
import { escapeSimpleQuotes } from "../../helpers/escapeSimpleQuotes";

export async function addSite(values: any) {
      const cols = getColumns("sites");
      const datas = cols.map(e => isNaN(values[e]) ? escapeSimpleQuotes(values[e]) : values[e]);  
      return await executeSql(`INSERT INTO sites (${cols.map(e => `"${e}"`).join()}) VALUES (${createPgValues("sites", values)}) RETURNING id`);
};

export async function updateSite(values: any, id: number) {
      const cols = getColumns("sites");
      const datas = cols.filter(e => values[e]);
      return await executeSql(`UPDATE sites SET ${datas.map(e => `"${e}" = '${values[e]}'`).join()} WHERE id = ${ id }`)
      .then(async res => {
            return await sql`SELECT * FROM sites WHERE id = ${ id }`
      });
};