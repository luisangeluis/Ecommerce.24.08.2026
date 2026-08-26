import { Request, Response } from "express";
import { ProductControllerInterface } from "./interfaces/product.controller.interface";
import { ProductService } from "./product.service";

export class ProductController implements ProductControllerInterface {

    constructor(private readonly productService:ProductService) {}

    getAll = async (req:Request,res:Response) => {
        const products = await this.productService.getAllProducts();
        return  await res.status(200).json(products);
    }
}