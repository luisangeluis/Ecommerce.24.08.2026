import type { Request, Response } from "express";

export interface AuthControllerInterface {
    login(req: Request<{}, {}, { email: string, password: string }>, res: Response): Promise<Response>;
    register(req: Request<{ email: string, password: string }>, res: Response): Promise<Response>;
}