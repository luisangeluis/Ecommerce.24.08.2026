import { Request, Response } from "express";
import { Product } from "../types/Product";

export interface ProductControllerInterface {
    getAll(req: Request, res: Response): Promise<Response>
    getById(req: Request, res: Response): Promise<Response>
    create(req: Request, res: Response): Promise<Response>
    updateById(req: Request, res: Response): Promise<Response>
    deleteById(req: Request, res: Response): Promise<Response>
}