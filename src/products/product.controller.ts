import { Request, Response } from "express";
import { ProductControllerInterface } from "./interfaces/product.controller.interface";
import { ProductCreationAttributes } from "./product.model";
import { ProductServiceInterface } from "./interfaces/product.service.interface";

export class ProductController implements ProductControllerInterface {
    constructor(private readonly productService: ProductServiceInterface) { }

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

    //Get all products by user id
    getByUserId = async (req: Request, response: Response) => {
        const userId = req.user.id;

        const products = await this.productService.getProductsByUserId(userId);
        return response.status(200).json(products);
    }
}