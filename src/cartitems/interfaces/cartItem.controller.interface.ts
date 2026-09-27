import { Request, RequestHandler, Response } from "express";
import { CreateCartItemDto, UpdateCartItemDto } from "../cartItem.dto";
import { IdParams } from "../cartItem.controller";
import { TypedRequest } from "../../common/types/express";

export interface CartItemControllerInterface {
    addProductToCart(req: Request, res: Response): Promise<Response>
    updateQuantity(req: TypedRequest, res: Response): Promise<Response>
    removeProductFromCart(req: Request, res: Response): Promise<Response>
    emptyCart(req:TypedRequest,res:Response):Promise<Response>
}