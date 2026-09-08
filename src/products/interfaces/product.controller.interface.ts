import { Request, Response } from "express";
import { ProductCreationAttributes } from "../product.model";
import { CreateProductDto } from "../middlewares/validateCreateProduct.middleware";

export interface ProductControllerInterface {
    getAll(req: Request, res: Response): Promise<Response>
    getById(req: Request, res: Response): Promise<Response>
    create(req: Request<{}, {}, CreateProductDto>, res: Response): Promise<Response>
    update(req: Request, res: Response): Promise<Response>
    delete(req: Request, res: Response): Promise<Response>
    getByUserId(req: Request, res: Response): Promise<Response>
}