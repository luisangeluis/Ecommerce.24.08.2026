import { Request, Response } from "express";
import AuthService from "./auth.service";
import { AuthControllerInterface } from "./interfaces/auth.controller.interface";
import { AuthServiceInterface } from "./interfaces/auth.service.interface";

export default class AuthController implements AuthControllerInterface {
    constructor(private readonly authService: AuthServiceInterface) { }

    login = async (req: Request<{}, {}, { email: string, password: string }>, res: Response) => {
        const { email, password } = req.body;
        const token = await this.authService.login(email, password);

        return res.status(200).json({ token });
    }
}