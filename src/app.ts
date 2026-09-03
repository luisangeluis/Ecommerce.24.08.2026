import express, { Application } from "express";
import { ProductContainer } from "./products/product.container";

export class App{
    private express: Application;
    private readonly productContainer:ProductContainer

    constructor() {
        this.express = express();
        this.productContainer = new ProductContainer();
        this.routes();
    }

    private routes(){
        this.express.use("/products",this.productContainer.getRouter());
    }

    listen(port:number = 3000){
        this.express.listen(port);
        console.log("Server is running on port " + port);
    }   
}