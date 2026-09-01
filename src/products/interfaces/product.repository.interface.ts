import { Product } from "../types/Product";

export interface ProductRepositoryInterface{
    getAllProducts():Promise<Product[]>
    getProductById(id: string):Promise<Product | null>
}