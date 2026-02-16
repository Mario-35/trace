import { base, executeSql, sql } from "../db";
import { escapeSimpleQuotes } from "../helpers/escapeSimpleQuotes";




export async function readAll(table: string) {
      return await sql`SELECT * FROM ${ sql(table) }`
};

export async function readAlSearch(table: string, search: string) {
       const tableColumns = Object.keys(base[table as keyof object]["columns" as keyof object]);
      return await sql.unsafe(`SELECT * FROM ${table} WHERE ${tableColumns.map(e => `"${e}" LIKE '%${search}%'`).join(" OR ")}`);
};


export async function readId(table: string, id: number) {
      return await sql`SELECT * FROM ${ sql(table) } WHERE id = ${ id }`;
};

export async function readIds(table: string, ids: number[]) {
      return await sql.unsafe(`SELECT * FROM ${table} WHERE id IN (${ ids.join() })`);

};
export async function readIdentifications(table: string, ientifications: string[]) {
            return await sql.unsafe(`SELECT * FROM ${table} WHERE id IN ('${ ientifications.join("','") }')`);
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





export async function deleteId(table: string, id: number) {
      return await sql`DELETE FROM ${ sql(table) } WHERE id = ${ id }`
};

export async function addExcel(values: any) { 
      return await executeSql(`INSERT INTO excels (datas) VALUES ('${escapeSimpleQuotes(JSON.stringify(values))}') RETURNING id`);
}
