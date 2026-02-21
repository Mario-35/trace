import { getColumns } from ".";
import { dataBase } from "./base";

export function createPgValues(tableName: string, values: any) {
      const results: string[] = [];

      const columns = getColumns(tableName);
      columns.forEach(column => {
            if (values[column]) {
                  switch (dataBase[tableName].columns[column].type) {
                        case "text[]":
                              results.push(`{"${values[column].split(',').join('","')}"}`);
                              break;                  
                        default:
                              results.push(values[column]);
                  }
            }
      })
      return `'${results.join("','")}'`;
}