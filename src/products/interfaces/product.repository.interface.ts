import { Product } from "../types/Product";

export interface ProductRepositoryInterface{
    getAllProducts():Promise<Product[]>
}