import { Router } from "express";
import AuthController from "./auth.controller";
import validateLoginMiddleware from "./middlewares/validateLogin.middleware";
import { AuthRouterInterface } from "./interfaces/auth.router.interface";
import { AuthControllerInterface } from "./interfaces/auth.controller.interface";

export class AuthRouter implements AuthRouterInterface{
    private readonly router: Router;

    constructor(private readonly authController: AuthControllerInterface) {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router
            .post("/login", validateLoginMiddleware, this.authController.login);
    }

    getRouter() {
        return this.router;
    }
}