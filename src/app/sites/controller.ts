
import { base, executeSql, sql } from "../../db";
import { escapeSimpleQuotes } from "../../helpers/escapeSimpleQuotes";

export async function addSite(values: any) {
      const cols = Object.keys(base.sites.columns);
      const datas = cols.map(e => isNaN(values[e]) ? escapeSimpleQuotes(values[e]) : values[e]);  
      return await executeSql(`INSERT INTO sites (${cols.map(e => `"${e}"`).join()}) VALUES (${datas.map(e => `'${e}'`).join()}) RETURNING id`);
};

// export async function searchPasseport(annee: number) {
//       return await executeSql(`SELECT * from sites where annee = '${annee}'`);
// };

export async function updateSite(values: any, id: number) {
      console.log(values);
      const cols = Object.keys(base.sites.columns);
      const datas = cols.filter(e => values[e]);
      return await executeSql(`UPDATE sites SET ${datas.map(e => `"${e}" = '${values[e]}'`).join()} WHERE id = ${ id }`)
      .then(async res => {
            return await sql`SELECT * FROM sites WHERE id = ${ id }`
      });
};