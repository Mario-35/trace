import { sql } from "../db"
import { executeSql } from "../db/executeSql";
import { escapeSimpleQuotes } from "../helpers/escapeSimpleQuotes";

const base = {
      "passeports" : {
            "columns": {
                  "annee": "number" ,
                  "nom": "text" ,
                  "code": "text" ,
                  "tracabilite": "number" ,
                  "identifiant": "text" ,
                  "fichier": "text" ,
                  "origine": "text" ,
            }
      } ,
      "configuration" : {
            "columns": {
                  "params": "jsonb" ,
            }
      } ,
      "excels" : {
            "columns": {
                  "datas": "jsonb" ,
            }
      } ,
      "echantillons" : {
            "columns": {
                  "type": "text" ,
                  "programme": "text" ,
                  "site": "text" ,
                  "responsable": "text" ,
                  "identification": "text" ,
                  "parent": "text" ,
                  "libre": "text" ,
                  "prelevement": "date",
                  "peremption": "date",
                  "pays": "text" ,
                  "region": "text" ,
                  "pointx": "text",
                  "pointy": "text",
                  "passeport": "number" ,
                  "cultures": "jsonb",
                  "etiquette": "jsonb",
                  "stockage": "jsonb",
                  "etat": "text"
            }
      } 
}


export async function readAll(table: string) {
      return await sql`SELECT * FROM ${ sql(table) }`
};

export async function readAlSearch(table: string, search: string) {
       const tableColumns = Object.keys(base[table as keyof object]["columns" as keyof object]);
      return await sql.unsafe(`SELECT * FROM ${table} WHERE ${tableColumns.map(e => `"${e}" LIKE '%${search}%'`).join(" OR ")}`);
};

export async function readEchantillons() {
      return await sql`SELECT id, programme, site, responsable, prelevement, identification, etat FROM echantillons ORDER BY identification`
};

export async function readId(table: string, id: number) {
      return await sql`SELECT * FROM ${ sql(table) } WHERE id = ${ id }`;
};

export async function readIds(table: string, ids: number[]) {
      return await sql.unsafe(`SELECT * FROM ${table} WHERE id IN (${ ids.join() })`);
};

export async function addSelection(values: any) {
      return await executeSql(`INSERT INTO selections (ids) VALUES ('{${values}}') RETURNING id`);      
}

export async function setConfiguration(values: any) {
      return await executeSql(`UPDATE configuration SET params='${values}'::jsonb WHERE nom = 'config'`);      
}

export async function getConfiguration() {
      return await executeSql(`SELECT params FROM configuration WHERE nom = 'config'`);      
}

export function verifyBody(values: any) {
      try {
            if (!values) return undefined;
            if (Object.keys(values).length < 1) return undefined;
      } catch (error) {
            console.log(error);            
            return undefined;            
      }
      return values
}

export async function addEchantillon(values: any) {
      const queries:string[] = [];
      let tmpCode: string | undefined = undefined;
      // Create list of columns
      const tableColumns = Object.keys(base.echantillons.columns);
      // Create list insert into
      const insertInto = tableColumns.map(e => `"${e}"`);
      // If excel instert
      if (values["excel" as keyof object]) {
            // get the excel file saved
            const excelFile = await readId("excels",  +values["excel" as keyof object]);
            // Create list of excel columns
            const excelCols = excelFile[0]["datas" as keyof object]["columns"];
            // lopp excel lines
            Object.values(excelFile[0]["datas" as keyof object]["datas"]).forEach((tmp: any) => {
                  // clone line
                  const tempVal = JSON.parse(JSON.stringify(values));
                  // modify the lines with excel values
                  Object.keys(excelCols).forEach(key => {
                        delete tempVal[key];
                        tempVal[key] = tmp[excelCols[key as keyof object]]; // TODO CHANGE VALUES
                  });
                  // create identification
                  if (tempVal["identification"] )
                        tempVal["identification"] = values["identification" as keyof object].slice(0,12) + String(+tmp[excelCols["echantillon" as keyof object]]).padStart(4, '0');

                  if (!tmpCode)  tmpCode =  values["identification" as keyof object].slice(0,12);

                  // const tmpCode: string =  values["identification" as keyof object].slice(0,12);
                  // Create list insert values
                  const vals = tableColumns.map(e => tempVal[e as keyof object]).map(e => `'${e}'`);
                  // Go
                  queries.push(`INSERT INTO echantillons (${insertInto.join()}) VALUES (${ vals.join()})`);
            });
      } else {
            // Get the nb of lines to insert
            const nb= +values["nombre" as keyof object];
            // Get the start number
            const start= +values["numero" as keyof object];
            // create start string for identification
            tmpCode =  values["identification" as keyof object].slice(0,12);
            // create identification codes
            const codesIdentification:string[] = []
            for (var i = 0; i <= nb; i++)
                  codesIdentification.push(tmpCode + String(i + start).padStart(4, '0'));
            // loop in identifications
            codesIdentification.forEach((identification) => {
                  values["identification" as keyof object] = identification;
                  // Go
                  queries.push(`INSERT INTO echantillons (${insertInto.join()}) VALUES (${ tableColumns.map(e => values[e]).map(e => `'${e}'`).join()})`);
            });            
            
      }
      executeSql(queries);
      return {identification : tmpCode};
};

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

export async function updateEchantillon(values: any, id: number) {
      const cols = Object.keys(base.echantillons.columns);
      const datas = cols.filter(e => values[e]);
      return await executeSql(`UPDATE echantillons SET ${datas.map(e => `"${e}" = '${values[e]}'`).join()} WHERE id = ${ id }`)
      .then(async res => {
            return await sql`SELECT * FROM echantillons WHERE id = ${ id }`
      })

};

export async function updatePasseport(values: any, id: number) {
      const cols = Object.keys(base.passeports.columns);
      const datas = cols.filter(e => values[e]);
      return await executeSql(`UPDATE passeports SET ${datas.map(e => `"${e}" = '${values[e]}'`).join()} WHERE id = ${ id }`)
      .then(async res => {
            return await sql`SELECT * FROM passeports WHERE id = ${ id }`
      });
};

export async function deleteId(table: string, id: number) {
      return await sql`DELETE FROM ${ sql(table) } WHERE id = ${ id }`
};

export async function addExcel(values: any) { 
      return await executeSql(`INSERT INTO excels (datas) VALUES ('${escapeSimpleQuotes(JSON.stringify(values))}') RETURNING id`);
}
