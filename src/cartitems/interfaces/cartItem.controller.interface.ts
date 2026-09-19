import { Request, Response } from "express";
import { CreateCartItemDto } from "../cartItem.dto";

export interface CartItemControllerInterface{
    addProductToCart(req:Request, res:Response):Response
}