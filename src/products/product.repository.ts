import { ProductRepositoryInterface } from "./interfaces/product.repository.interface";
import { CreateProductDto } from "./product.dto";
import Product, { ProductAttributes, ProductCreationAttributes } from "./product.model";

export class ProductRepository implements ProductRepositoryInterface {
    constructor(private readonly productModel: typeof Product) { }

    async getAllProducts() {
        return await this.productModel.findAll();
    }

    async getProductById(id: string) {
        return await this.productModel.findByPk(id);
    }

    async createProduct(data: CreateProductDto, userId: string) {
        const productData = { ...data, userId }
        return await this.productModel.create(productData);
    }

    async updateProductById(id: string, data: Partial<ProductAttributes>) {
        const [affectedRows] = await this.productModel.update(data, { where: { id } });

        return affectedRows > 0 ? await this.getProductById(id) : null;
    }

    async deleteProductById(id: string) {
        return await this.productModel.destroy({ where: { id } });
    }

    async getProductsByUserId(userId: string): Promise<Product[]> {
        return await this.productModel.findAll({ where: { userId } });
    }
}