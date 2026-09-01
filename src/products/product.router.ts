import { Router } from "express";
import { ProductController } from "./product.controller";
import { validateIdMiddleware } from "../common/middlewares/validateId.middleware";

export class ProductRouter {
    private readonly router: Router;

    constructor(private readonly productController: ProductController) {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router
            .get("/", this.productController.getAll)
            .get("/:id", validateIdMiddleware, this.productController.getById);
    }

    getRouter() {
        return this.router;
    }
}