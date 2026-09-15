import { Request, Response } from "express";

export interface CartControllerInterface {
    getCart(req: Request, res: Response): Promise<Response>
}