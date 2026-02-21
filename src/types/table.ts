import { Icolumn } from "./column";


export interface Itable {
    columns: { [key: string]: Icolumn };
    constraints: string[];
}
