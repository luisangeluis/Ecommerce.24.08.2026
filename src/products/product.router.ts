import { Router } from "express";
import { ProductController } from "./product.controller";

export class ProductRouter {
    private readonly router:Router;

    constructor(private readonly productController: ProductController) {
        this.router = Router();
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