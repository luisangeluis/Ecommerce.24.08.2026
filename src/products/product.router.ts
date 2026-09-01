import { Router } from "express";
import { ProductController } from "./product.controller";
import validateIdMiddleware  from "../common/middlewares/validateId.middleware";
import validateCreateProductMiddleware from "./middlewares/validateCreateProduct.middleware";

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

        this.router
            .post("/", validateCreateProductMiddleware, this.productController.create);
    }

    getRouter() {
        return this.router;
    }
}