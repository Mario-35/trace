
import { base, executeSql, sql } from "../../db";
import { escapeSimpleQuotes } from "../../helpers/escapeSimpleQuotes";

export async function addPasseport(values: any) {
      const cols = Object.keys(base.passeports.columns);
      return executeSql(`SELECT max(tracabilite) FROM passeports WHERE annee = '${values["annee"]}'`).then(async res => {
            const tmp:string = res[0 as keyof object]["max" as keyof object];
            values["tracabilite" as keyof object] = isNaN(+tmp) ? 1 : +tmp + 1;
            const datas = cols.map(e => isNaN(values[e]) ? escapeSimpleQuotes(values[e]) : values[e]);  
            return await executeSql(`INSERT INTO passeports (${cols.map(e => `"${e}"`).join()}) VALUES (${datas.map(e => `'${e}'`).join()}) RETURNING id`);
      });
};

export async function searchPasseport(annee: number) {
      return await executeSql(`SELECT * from passeports where annee = '${annee}'`);
};

export async function updatePasseport(values: any, id: number) {
      const cols = Object.keys(base.passeports.columns);
      const datas = cols.filter(e => values[e]);
      return await executeSql(`UPDATE passeports SET ${datas.map(e => `"${e}" = '${values[e]}'`).join()} WHERE id = ${ id }`)
      .then(async res => {
            return await sql`SELECT * FROM passeports WHERE id = ${ id }`
      });
};