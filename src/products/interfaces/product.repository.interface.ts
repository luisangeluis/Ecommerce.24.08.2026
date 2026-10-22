import { LOCK, Transaction } from "sequelize";
import { CreateProductDto } from "../product.dto";
import Product, { ProductAttributes } from "../product.model";
import { getTransaction } from "../../database/connectDb";
const transaction = getTransaction();

export interface ProductRepositoryInterface {
    getAllProducts(): Promise<Product[]>
    getProductById(id: string, t?: Transaction,lock?:LOCK): Promise<Product | null>
    createProduct(data: CreateProductDto, userId: string): Promise<Product>
    updateProductById(id: string, data: Partial<ProductAttributes>, t?: Transaction): Promise<number>
    deleteProductById(id: string): Promise<number>
    getProductsByUserId(userId: string): Promise<Product[]>
}