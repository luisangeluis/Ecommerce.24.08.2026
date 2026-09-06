import { AppError } from "../common/errors/appError";
import { ProductRepositoryInterface } from "./interfaces/product.repository.interface";
import { ProductServiceInterface } from "./interfaces/product.service.interface";
import Product, { ProductAttributes, ProductCreationAttributes } from "./product.model";

export class ProductService implements ProductServiceInterface {
    constructor(private readonly productRepository: ProductRepositoryInterface) { }

    async getAllProducts() {
        return await this.productRepository.getAllProducts();
    }

    async getProductById(id: string) {
        const product = await this.productRepository.getProductById(id);
        if(!product)
            throw new AppError(404,`Product with id: ${id} not found`);

        return product;
    }

    async createProduct(data: ProductCreationAttributes): Promise<Product> {
        return await this.productRepository.createProduct(data);
    }

    async updateProductById(id: string, data: Partial<ProductAttributes>): Promise<Product | null> {
        return await this.productRepository.updateProductById(id, data);
    }

    async deleteProductById(id: string): Promise<boolean> {
        return await this.productRepository.deleteProductById(id);
    }

    async getProductsByUserId(userId: string): Promise<Product[]> {
        return await this.productRepository.getProductsByUserId(userId);
    }
}