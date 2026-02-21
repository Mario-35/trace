import { sql } from "../db";
import { dataBase } from "../db/base";


export async function readAll(table: string) {
      return await sql`SELECT * FROM ${ sql(table) }`
};

export async function readAlSearch(table: string, search: string) {
       const tableColumns = Object.keys(dataBase[table as keyof object]["columns" as keyof object]);
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


