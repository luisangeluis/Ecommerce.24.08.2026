import { AppError } from "../common/errors/appError";
import { ProductRepositoryInterface } from "./interfaces/product.repository.interface";
import { ProductServiceInterface } from "./interfaces/product.service.interface";
import { CreateProductDto } from "./product.dto";

export class ProductService implements ProductServiceInterface {
    constructor(private readonly productRepository: ProductRepositoryInterface) { }

    async getAllProducts() {
        const products = await this.productRepository.getAllProducts();
        const plainpProducts = products.map(p => p.toJSON())

        return plainpProducts;
    }

    async getProductById(id: string) {
        const product = await this.productRepository.getProductById(id);

        if (!product)
            throw new AppError(404, `Product with id: ${id} not found`);

        return product.toJSON();
    }

    async createProduct(data: CreateProductDto, userId: string) {
        const product = await this.productRepository.createProduct(data, userId);
        const plainProduct = product.toJSON();

        return plainProduct;
    }

    async updateProductById(id: string, data: Partial<CreateProductDto>) {
        const product = await this.productRepository.updateProductById(id, data);

        if (!product) throw new AppError(404, `Product with id: ${id} not found`);

        const plainProduct = product.toJSON();

        return plainProduct;
    }

    async deleteProductById(id: string): Promise<boolean> {
        const isDeleted = await this.productRepository.deleteProductById(id);

        if (!isDeleted)
            throw new AppError(404, `Product with id: ${id} not found`)

        return true;

    }

    async getProductsByUserId(userId: string) {
        const products = await this.productRepository.getProductsByUserId(userId);
        const plainProducts = products.map(p => p.toJSON());

        return plainProducts;
    }
}