import { Request, Response } from "express";
import { ProductControllerInterface } from "./interfaces/product.controller.interface";
import { ProductService } from "./product.service";

export class ProductController implements ProductControllerInterface {
    constructor(private readonly productService: ProductService) { }

    getAll = async (req: Request, res: Response) => {
        const products = await this.productService.getAllProducts();
        return res.status(200).json(products);
    }

    getById = async (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;
        const product = await this.productService.getProductById(id);

        if (!product)
            return res.status(404).json({ message: `Product with id: ${id} not found` });

        return res.status(200).json(product);
    }
}