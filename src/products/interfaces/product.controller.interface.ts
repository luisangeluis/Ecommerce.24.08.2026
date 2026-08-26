import { Request, Response } from "express";
import { Product } from "../types/Product";

export interface ProductControllerInterface {
    getAll(req:Request,res:Response): Promise<Response>
}