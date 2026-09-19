import { Request, response, Response } from "express";
import { ProductControllerInterface } from "./interfaces/product.controller.interface";
import { ProductCreationAttributes } from "./product.model";
import { ProductServiceInterface } from "./interfaces/product.service.interface";
import { successResponse } from "../common/utils/successResponse";
import { CreateProductDto, ProductResponseDto, productResponseSchema } from "./product.dto";

export class ProductController implements ProductControllerInterface {
    constructor(private readonly productService: ProductServiceInterface
    ) { }

    getAll = async (req: Request, res: Response) => {
        const products = await this.productService.getAllProducts();

        return successResponse({ res, data: products });
    }

    getById = async (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;
        const product = await this.productService.getProductById(id);

        return successResponse({ res, data: product })
    }

    create = async (req: Request<{}, {}, CreateProductDto>, res: Response) => {
        const data = req.body;
        const userId = req.user.id;
        const product = await this.productService.createProduct(data, userId);

        return successResponse({ res, data: product, statusCode: 201 })
    }

    update = async (req: Request<{ id: string }>, res: Response) => {
        const id = req.params.id;
        const data = req.body;
        const updatedProduct = await this.productService.updateProductById(id, data);

        return successResponse({ res, data: updatedProduct })
    }

    delete = async (req: Request<{ id: string }>, res: Response) => {
        const id = req.params.id;
        await this.productService.deleteProductById(id);

        return successResponse({
            res, data: null, message: `Product with id: ${id} successfully deleted`,
            statusCode: 204
        })
    }

    //Get all products by user id
    getByUserId = async (req: Request, res: Response) => {
        const userId = req.user.id;
        const products = await this.productService.getProductsByUserId(userId);

        return successResponse({ res, data: products })
    }
}