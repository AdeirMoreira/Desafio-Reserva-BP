import { DeleteResult, UpdateResult } from "typeorm";

export function affectedRecords(result: UpdateResult | DeleteResult){
    return `Affected records: ${result.affected}`
}