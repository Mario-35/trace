import postgres from "postgres";

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
            application_name: `Echantillons`
        }
    });
}