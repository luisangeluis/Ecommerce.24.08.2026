import { Product } from "./types/Product";

export class ProductRepository implements ProductRepository{
    constructor(private readonly product:Product) {}

    async getAllProducts(){
        return await this.product.findAll()
    }
}