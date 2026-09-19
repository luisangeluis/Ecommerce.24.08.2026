import { Request, Response } from "express";
import { AuthControllerInterface } from "./interfaces/auth.controller.interface";
import { AuthServiceInterface } from "./interfaces/auth.service.interface";
import { successResponse } from "../common/utils/successResponse";

export default class AuthController implements AuthControllerInterface {
    constructor(private readonly authService: AuthServiceInterface) { }

    login = async (req: Request<{}, {}, { email: string, password: string }>, res: Response) => {
        const { email, password } = req.body;
        const token = await this.authService.login(email, password);

        return successResponse({ res, data: token });
    }
}