import { Router } from "express";
import validateIdMiddleware  from "../common/middlewares/validateId.middleware";
import validateCreateProductMiddleware from "./middlewares/validateCreateProduct.middleware";
import { ProductControllerInterface } from "./interfaces/product.controller.interface";
import validateAuthMiddleware from "../common/middlewares/auth.middleware";

export class ProductRouter {
    private readonly router: Router;

    constructor(private readonly productController: ProductControllerInterface) {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router
            .get("/my-products", validateAuthMiddleware, this.productController.getByUserId)
            .get("/", this.productController.getAll)
            .get("/:id", validateIdMiddleware, this.productController.getById);

        this.router
            .post("/", validateCreateProductMiddleware, this.productController.create);

        this.router
            .put("/:id", validateIdMiddleware, this.productController.update);

        this.router
            .delete("/:id", validateIdMiddleware, this.productController.delete);
    }

    getRouter() {
        return this.router;
    }
}