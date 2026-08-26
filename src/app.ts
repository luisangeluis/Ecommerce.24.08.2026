import express, { Application } from "express";
import { ProductRouter } from "./products/product.router";
import { ProductController } from "./products/product.controller";

export class App{
    private express: Application;
    private readonly productController:ProductController;

    constructor() {
        this.express = express();
        this.productController = new ProductController();
        this.routes();
    }

    private routes(){
        const productRoutes = new ProductRouter(this.productController);

        this.express.use("/products", productRoutes.getRouter());
    }

    listen(port:number = 3000){
        this.express.listen(port);
        console.log("Server is running on port " + port);
    }   
}