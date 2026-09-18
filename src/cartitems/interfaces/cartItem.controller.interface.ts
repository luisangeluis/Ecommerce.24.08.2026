import { Request, Response } from "express";

export interface CartItemControllerInterface{
    addProductToCart(req:Request, res:Response):Response
}