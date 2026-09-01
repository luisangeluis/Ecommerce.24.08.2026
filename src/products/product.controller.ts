import { Request, Response } from "express";
import { ProductControllerInterface } from "./interfaces/product.controller.interface";
import { ProductService } from "./product.service";
import { ProductCreationAttributes } from "./product.model";

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

    create = async (req: Request<ProductCreationAttributes>, res: Response) => {
        const data = req.body;
        const product = await this.productService.createProduct(data);
        return res.status(201).json(product);
    }

    update = async (req: Request<{ id: string }>, res: Response) => {
        const id = req.params.id;
        const data = req.body;

        const updatedProduct = await this.productService.updateProductById(id, data);

        if (!updatedProduct)
            return res.status(404).json({ message: `Product with id: ${id} not found` });

        return res.status(200).json(updatedProduct);
    }

    delete = async (req: Request<{ id: string }>, res: Response) => {
        const id = req.params.id;
        const deletedProduct = await this.productService.deleteProductById(id);

        if (!deletedProduct)
            return res.status(404).json({ message: `Product with id: ${id} not found` });

        return res.status(200).json({ message: `Product with id: ${id} deleted successfully` });
    }

    getByUserId = async(req: Request,response:Response)=>{
        
    }
}