import { App } from "./app";
import { connectDb } from "./database/connectDb";
import { createUsersSeeder } from "./database/seeders/createUsers.seeder";
import {mysqlDatabase, mysqlRootPassword, mysqlUser} from "./dev.env";

const app = new App();

async function main(){
    await connectDb();
    await createUsersSeeder();
    
    app.listen(3000);
}

main();
