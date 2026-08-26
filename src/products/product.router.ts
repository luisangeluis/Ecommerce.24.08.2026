import { Router } from "express";
import { ProductController } from "./product.controller";

export class ProductRouter {
    private readonly router:Router;
    private readonly productController: ProductController;

    constructor(productController: ProductController) {
        this.router = Router();
        this.productController = productController;
        this.routes();
    }

    private routes() {
        this.router.get("/", this.productController.getAll);

        this.router.post("/", (req: any, res: any) => {
            res.send("Create a new product");
        });
    }

    getRouter() {
        return this.router;
    }
}