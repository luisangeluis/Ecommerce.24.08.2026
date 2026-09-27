import { Request, Response } from "express";
import { CreateCartItemDto, UpdateCartItemDto } from "../cartItem.dto";
import { CartItemParams } from "../cartItem.controller";

export interface CartItemControllerInterface {
    addProductToCart(req: Request, res: Response): Promise<Response>
    updateQuantity(req: Request, res: Response): Promise<Response>
}