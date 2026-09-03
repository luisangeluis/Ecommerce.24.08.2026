import { Router } from "express";
import AuthController from "./auth.controller";
import validateLoginMiddleware from "./middlewares/validateLogin.middleware";

export class AuthRouter {
    private readonly router: Router;

    constructor(private readonly authController: AuthController) {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router
            .post("/register", validateLoginMiddleware, this.authController.login)
            .post("/login", this.authController.register);
    }

    getRouter() {
        return this.router;
    }
}