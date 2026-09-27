import { Router } from "express";
import { CartItemControllerInterface } from "./interfaces/cartItem.controller.interface";
import validateAuthMiddleware from "../auth/middlewares/validateAuth.middleware";
import validateIdMiddleware from "../common/middlewares/validateId.middleware";

export class CartItemRouter {
    private readonly router: Router;

    constructor(private readonly cartItemController: CartItemControllerInterface) {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router
            .post("/", validateAuthMiddleware, this.cartItemController.addProductToCart)
            .patch("/:id",
                validateAuthMiddleware,
                validateIdMiddleware,
                this.cartItemController.updateQuantity);
    }

    getRouter() {
        return this.router;
    }
}