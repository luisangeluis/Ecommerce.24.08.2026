import { ProductRepositoryInterface } from "../interfaces/product.repository.interface";
import { ProductServiceInterface } from "../interfaces/product.service.interface";
import { ProductService } from "../product.service";

describe("ProductService", () => {
    let service: ProductServiceInterface;

    const mockProductRepository = {
        getAllProducts: jest.fn(),
        getProductById: jest.fn(),
        createProduct: jest.fn(),
        updateProductById: jest.fn(),
        deleteProductById: jest.fn(),
        getProductsByUserId: jest.fn()
    }

    beforeEach(() => {
        jest.clearAllMocks();

        service = new ProductService(mockProductRepository as unknown as ProductRepositoryInterface);
    });

    describe("getAllProducts", () => {
        it("should return all products", async () => {
            const products = [
                {
                    id: "e06f6c57-c400-4feb-ace7-d15493531c3f",
                    title: "Product 1",
                    description: "Description 1",
                    price: "100.00",
                    userId: "550e8400-e29b-41d4-a716-446655440001",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: "c33bdc0a-4972-4172-8c9c-358db8bc095a",
                    title: "Product 2",
                    description: "Description 2",
                    price: "200.00",
                    userId: "550e8400-e29b-41d4-a716-446655440001",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ]
            const mockProducts = products.map(p => ({ toJSON: jest.fn().mockReturnValue(p) }));

            mockProductRepository.getAllProducts.mockResolvedValue(mockProducts);

            const result = await service.getAllProducts();

            expect(result).toEqual(products);
            expect (mockProductRepository.getAllProducts).toHaveBeenCalledTimes(1);
            expect(mockProductRepository.getAllProducts).toHaveBeenCalledWith();
        })
    });
})