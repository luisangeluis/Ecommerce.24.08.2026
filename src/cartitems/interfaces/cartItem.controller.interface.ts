import { Request, RequestHandler, Response } from "express";
import { CreateCartItemDto, UpdateCartItemDto } from "../cartItem.dto";
import { IdParams } from "../cartItem.controller";

export interface CartItemControllerInterface {
    addProductToCart(req: Request, res: Response): Promise<Response>
    updateQuantity(req:Request, res:Response): Promise<Response>
    removeProductFromCart(req:Request, res:Response): Promise<Response>

}