import { Router } from "express";
import { CartItemControllerInterface } from "./interfaces/cartItem.controller.interface";
import validateAuthMiddleware from "../auth/middlewares/validateAuth.middleware";

export class CartItemRouter {
    private readonly router: Router;

    constructor(private readonly cartItemController: CartItemControllerInterface) {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router
            .post("/", validateAuthMiddleware, this.cartItemController.addProductToCart)
            .patch("/:id",validateAuthMiddleware,this.cartItemController.updatedQuantity);
    }

    getRouter() {
        return this.router;
    }
}