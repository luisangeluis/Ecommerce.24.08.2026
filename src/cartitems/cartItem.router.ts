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
        this.router.route("/")
            .post(validateAuthMiddleware, this.cartItemController.addProductToCart)
            .delete(validateAuthMiddleware, this.cartItemController.emptyCart)

        this.router.route("/:id")
            .patch(validateAuthMiddleware,
                validateIdMiddleware,
                this.cartItemController.updateQuantity)
            .delete(validateAuthMiddleware,
                validateIdMiddleware,
                this.cartItemController.removeProductFromCart)
    }

    getRouter() {
        return this.router;
    }
}