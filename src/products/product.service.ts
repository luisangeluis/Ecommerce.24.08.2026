import { NotFoundError } from "../common/errors/notFound.error";
import { ResponseValidationError } from "../common/errors/responseValidationError";
import { ProductRepositoryInterface } from "./interfaces/product.repository.interface";
import { ProductServiceInterface } from "./interfaces/product.service.interface";
import { CreateProductDto, productResponseSchema } from "./product.dto";

export class ProductService implements ProductServiceInterface {
    constructor(private readonly productRepository: ProductRepositoryInterface) { }

    async getAllProducts() {
        const products = await this.productRepository.getAllProducts();
        const plainProducts = products.map(p => p.toJSON());

        const result = productResponseSchema.array().safeParse(plainProducts);

        if(!result.success) throw new ResponseValidationError(result.error);

        return result.data;
    }

    async getProductById(id: string) {
        const product = await this.productRepository.getProductById(id);

        if (!product)
            throw new NotFoundError(`Product with id: ${id} not found`);

        const plainProduct = product.toJSON();

        const result = productResponseSchema.safeParse(plainProduct);

        if(!result.success) throw new ResponseValidationError(result.error);

        return result.data;
    }

    async createProduct(data: CreateProductDto, userId: string) {
        const product = await this.productRepository.createProduct(data, userId);
        const plainProduct = product.toJSON();

        const result = productResponseSchema.safeParse(plainProduct);
        console.log("result", result);
        if(!result.success) throw new ResponseValidationError(result.error);

        return result.data;
    }

    async updateProductById(id: string, data: Partial<CreateProductDto>) {
        const product = await this.productRepository.updateProductById(id, data);

        if (!product) throw new NotFoundError(`Product with id: ${id} not found`);

        const plainProduct = product.toJSON();

        const result =  productResponseSchema.safeParse(plainProduct);

        if(!result.success) throw new ResponseValidationError(result.error);

        return result.data;
    }

    async deleteProductById(id: string): Promise<boolean> {
        const affectedRows = await this.productRepository.deleteProductById(id);

        if (affectedRows === 0)
            throw new NotFoundError(`Product with id: ${id} not found`)

        return true;
    }

    async getProductsByUserId(userId: string) {
        const products = await this.productRepository.getProductsByUserId(userId);
        const plainProducts = products.map(p => p.toJSON());

        const result = productResponseSchema.array().safeParse(plainProducts);

        if(!result.success) throw new ResponseValidationError(result.error);

        return result.data;
    }
}