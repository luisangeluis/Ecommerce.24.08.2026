import { CreateProductDto, ProductResponseDto } from "../product.dto";
import Product, { ProductAttributes, ProductCreationAttributes } from "../product.model";

export interface ProductServiceInterface {
    getAllProducts(): Promise<ProductResponseDto[]>
    getProductById(id: string): Promise<ProductResponseDto | null>
    createProduct(data: CreateProductDto, userId: string): Promise<ProductResponseDto>
    updateProductById(id: string, data: Partial<ProductAttributes>): Promise<ProductResponseDto | null>
    deleteProductById(id: string): Promise<boolean>
    getProductsByUserId(userId: string): Promise<ProductResponseDto[]>
}