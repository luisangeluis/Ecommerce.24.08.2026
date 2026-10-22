import { LOCK, Transaction, TransactionOptions } from "sequelize";
import { ProductRepositoryInterface } from "./interfaces/product.repository.interface";
import { CreateProductDto } from "./product.dto";
import Product, { ProductAttributes, ProductCreationAttributes } from "./product.model";

export class ProductRepository implements ProductRepositoryInterface {
    constructor(private readonly productModel: typeof Product) { }

    async getAllProducts() {
        return await this.productModel.findAll();
    }

    async getProductById(id: string, t?: Transaction, lock?: LOCK) {
        return await this.productModel.findByPk(id,
            {
                transaction: t,
                lock
            });
    }

    async createProduct(data: CreateProductDto, userId: string) {
        const productData = { ...data, userId }
        return await this.productModel.create(productData);
    }

    async updateProductById(id: string, data: Partial<ProductAttributes>, t?: Transaction) {
        const [affectedRows] = await this.productModel.update(data,
            { where: { id }, transaction: t },);

        return affectedRows;
    }

    async deleteProductById(id: string) {
        return await this.productModel.destroy({ where: { id } });
    }

    async getProductsByUserId(userId: string): Promise<Product[]> {
        return await this.productModel.findAll({ where: { userId } });
    }
}