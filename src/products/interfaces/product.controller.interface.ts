import { Request, Response } from "express";
import { ProductCreationAttributes } from "../product.model";

export interface ProductControllerInterface {
    getAll(req: Request, res: Response): Promise<Response>
    getById(req: Request, res: Response): Promise<Response>
    create(req: Request<ProductCreationAttributes>, res: Response): Promise<Response>
    update(req: Request, res: Response): Promise<Response>
    delete(req: Request, res: Response): Promise<Response>
    getByUserId(req: Request,res:Response): Promise<Response>
}