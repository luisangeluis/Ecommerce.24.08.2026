import { Request, Response } from "express";
import { TypedRequest } from "../../common/types/express";

export interface CartControllerInterface {
    getCart(req: Request, res: Response): Promise<Response>
}