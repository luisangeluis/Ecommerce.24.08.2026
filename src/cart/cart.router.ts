import { Router } from "express";
import { CartControllerInterface } from "./interfaces/cart.controller.interface";
import { CartItemControllerInterface } from "../cartitems/interfaces/cartItem.controller.interface";
import validateAuthMiddleware from "../auth/middlewares/validateAuth.middleware";

export class CartRouter {
    private readonly router: Router;

    constructor(private readonly cartController: CartControllerInterface) {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router
            .get("/", validateAuthMiddleware, this.cartController.getCart);


    }

    getRouter() {
        return this.router;
    }
}