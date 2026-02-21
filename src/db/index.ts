import postgres from "postgres";
import { dataBase } from "./base";
import { executeSql } from "./executeSql";

export const sql = postgres('postgres://postgres:mario29@localhost:5432/trace', {
    host                 : 'localhost',   // Postgres ip address[s] or domain name[s]
    port                 : 5432,          // Postgres server port[s]
    database             : 'trace',         // Name of database to connect to
    username             : 'postgres',    // Username of database user
    password             : 'mario29',     // Password of database user
    debug: true,
    max: 2000,
    connection: {
        application_name: `Echantillons`
    }
});

export function admin(password: string) {    
    return postgres(`postgres://postgres:${password}@localhost:5432/postgres`, {
        host                 : 'localhost',   // Postgres ip address[s] or domain name[s]
        port                 : 5432,          // Postgres server port[s]
        database             : 'postgres',         // Name of database to connect to
        username             : 'postgres',    // Username of database user
        password             : password,     // Password of database user
        debug: true,
        max: 2000,
        connection: {
            application_name: `Trace`
        }
    });
}

export const getColumns = (tableName: string) => Object.keys(dataBase[tableName].columns).filter(e => e != "id");

export function addPartiton(name: string) {
    executeSql(`CREATE TABLE IF NOT EXISTS "echantillon_${name.toLowerCase()}" PARTITION OF echantillons FOR VALUES IN ('${name}');`);
}

export {executeSql} from "./executeSql"
export {executeSqlValues} from "./executeSqlValues"
export {createDB} from "./createDB"
export {createDetaultDatas} from "./createDetaultDatas"
export {createPgValues} from "./createPgValues"


