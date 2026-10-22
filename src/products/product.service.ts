import { NotFoundError } from "../common/errors/notFound.error";
import { ResponseValidationError } from "../common/errors/responseValidationError";
import { withTransaction } from "../common/helpers/withTransaction.helper";
import { validatedResponse } from "../common/utils/validatedResponse";
import { ProductRepositoryInterface } from "./interfaces/product.repository.interface";
import { ProductServiceInterface } from "./interfaces/product.service.interface";
import { CreateProductDto, productResponseSchema } from "./product.dto";

export class ProductService implements ProductServiceInterface {
    constructor(private readonly productRepository: ProductRepositoryInterface) { }

    async getAllProducts() {
        const products = await this.productRepository.getAllProducts();
        return validatedResponse(products, productResponseSchema.array());
    }

    async getProductById(id: string) {
        const product = await this.productRepository.getProductById(id);

        if (!product)
            throw new NotFoundError(`Product with id: ${id} not found`);

        return validatedResponse(product, productResponseSchema);
    }

    async createProduct(data: CreateProductDto, userId: string) {
        const product = await this.productRepository.createProduct(data, userId);

        return validatedResponse(product, productResponseSchema);
    }

    async updateProductById(id: string, data: Partial<CreateProductDto>) {
        return withTransaction(async (t) => {
            const product = await this.productRepository.getProductById(id, t, t.LOCK.UPDATE);

            if (!product) throw new NotFoundError(`Product with id: ${id} does not exist`);

            await this.productRepository.updateProductById(id, data, t);
            //todo: validar si product se devuelve actualizado, segun al ejecutar model.update
            // todo: segun al leer model.update no lo lee desde la bd, pero si actualiza a los
            //todo: valores que se le dieron en model.update
            return validatedResponse(product, productResponseSchema);
        })
    }

    async deleteProductById(id: string): Promise<boolean> {
        const affectedRows = await this.productRepository.deleteProductById(id);

        if (affectedRows === 0)
            throw new NotFoundError(`Product with id: ${id} not found`)

        return true;
    }

    async getProductsByUserId(userId: string) {
        const products = await this.productRepository.getProductsByUserId(userId);
        return validatedResponse(products,productResponseSchema.array());
    }
}