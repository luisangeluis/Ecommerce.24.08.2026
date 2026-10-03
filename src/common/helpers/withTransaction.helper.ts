import { Transaction } from "sequelize";
import sequelize from "../../database/sequelize.config";

export const withTransaction = async <T>(
    callback: (t: Transaction) => Promise<T>
): Promise < T > =>{
    return sequelize.transaction(callback);
}