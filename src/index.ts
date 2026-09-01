import { App } from "./app";
import { connectDb } from "./database/connectDb";
import {mysqlDatabase, mysqlRootPassword, mysqlUser} from "./dev.env";

const app = new App();

async function main(){
    await connectDb();
    
    app.listen(3000);
}

main();
