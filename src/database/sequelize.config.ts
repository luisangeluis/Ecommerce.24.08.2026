import { Sequelize } from "sequelize-typescript";
import { mysqlDatabase, mysqlHost, mysqlPort, mysqlRootPassword, mysqlUser } from "../dev.env";

const sequelize = new Sequelize({
    dialect:"mysql",
    host:mysqlHost,
    port:mysqlPort ? Number(mysqlPort) : 3306,
    database:mysqlDatabase,
    username:mysqlUser,
    password:mysqlRootPassword,
    models:[__dirname+"/../**/*.model.ts"]
})

export default sequelize;