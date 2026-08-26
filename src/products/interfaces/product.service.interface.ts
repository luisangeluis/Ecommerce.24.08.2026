import { Product } from "../types/Product";

export interface ProductServiceInterface{
    getAllProducts():Promise<Product[]>
}