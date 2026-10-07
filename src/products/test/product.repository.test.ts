import { ProductRepository } from "../product.repository";
import Product from "../product.model";

describe("ProductRepository", () => {
    let repository: ProductRepository;

    const mockInstance = {
        findAll: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();

        repository = new ProductRepository(mockInstance as unknown as typeof Product);
    });

    describe("getAllProducts", () => {
        it("should return all products", async () => {
            const products = [
                {
                    id: "1",
                    title: "Product 1",
                    description: "Description 1",
                    price: "100.00",
                    userId: "550e8400-e29b-41d4-a716-446655440001",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: "2",
                    title: "Product 2",
                    description: "Description 2",
                    price: "200.00",
                    userId: "550e8400-e29b-41d4-a716-446655440001",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ];

            mockInstance.findAll.mockResolvedValue(products);

            const result = await repository.getAllProducts();

            expect(result).toEqual(products);
            expect(mockInstance.findAll).toHaveBeenCalledTimes(1);
        });
    });

    describe("getProductById", () => {
        it("should return a product by its ID", async () => {
            const product = {
                id: "1a093e48-7075-4c3e-805e-2d024cb4fb46",
                title: "Product 1",
                description: "Description 1",
                price: "100.00",
                userId: "550e8400-e29b-41d4-a716-446655440001",
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            mockInstance.findByPk.mockResolvedValue(product);

            const result = await repository.getProductById("1a093e48-7075-4c3e-805e-2d024cb4fb46");

            expect(result).toEqual(product);
            expect(mockInstance.findByPk).toHaveBeenCalledTimes(1);
            expect(mockInstance.findByPk).toHaveBeenCalledWith("1a093e48-7075-4c3e-805e-2d024cb4fb46",{ transaction: undefined });
        });

        it("should return null if product is not found", async () => {
            mockInstance.findByPk.mockResolvedValue(null);

            const result = await repository.getProductById("non-existent-id");

            expect(result).toBeNull();
            expect(mockInstance.findByPk).toHaveBeenCalledTimes(1);
            expect(mockInstance.findByPk).toHaveBeenCalledWith("non-existent-id",{ transaction: undefined });
        });
    });

    describe("createProduct", () => {
        it("should create a new product", async () => {
            const productData = {
                title: "New Product",
                description: "New Description",
                price: "150.00",
            };
            const userId = "550e8400-e29b-41d4-a716-446655440001";
            const createdProduct = {
                ...productData,
                id: "1a093e48-7075-4c3e-805e-2d024cb4fb46",
                userId,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            mockInstance.create.mockResolvedValue(createdProduct);

            const result = await repository.createProduct(productData, userId);

            expect(result).toEqual(createdProduct);
            expect(mockInstance.create).toHaveBeenCalledTimes(1);
            expect(mockInstance.create).toHaveBeenCalledWith({ ...productData, userId });
        });

        it(" should throw an error if creation fails", async () => {
            const productData = {
                title: "New Product",
                description: "New Description",
                price: "150.00",
            };
            const userId = "550e8400-e29b-41d4-a716-446655440001";

            mockInstance.create.mockRejectedValue(new Error("Creation failed"));

            await expect(repository.createProduct(productData, userId)).rejects.toThrow("Creation failed");
            expect(mockInstance.create).toHaveBeenCalledTimes(1);
            expect(mockInstance.create).toHaveBeenCalledWith({ ...productData, userId });
        });
    });

    describe("updateProductById", () => {
        it("should update a product by its ID", async () => {
            const productId = "1a093e48-7075-4c3e-805e-2d024cb4fb46";
            const updateData = {
                title: "Updated Product",
                price: "200.00",
            };
            const updatedProduct = {
                id: productId,
                title: "Updated Product",
                description: "Description 1",
                price: "200.00",
                userId: "550e8400-e29b-41d4-a716-446655440001",
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            mockInstance.update.mockResolvedValue([1]); // Simulate one row affected
            mockInstance.findByPk.mockResolvedValue(updatedProduct);

            const result = await repository.updateProductById(productId, updateData);

            expect(result).toEqual(updatedProduct);
            expect(mockInstance.update).toHaveBeenCalledTimes(1);
            expect(mockInstance.update).toHaveBeenCalledWith(updateData, { where: { id: productId } });
            expect(mockInstance.findByPk).toHaveBeenCalledTimes(1);
            expect(mockInstance.findByPk).toHaveBeenCalledWith(productId,{ transaction: undefined });
        });

        it("should return null if product is not found for update", async () => {
            const productId = "non-existent-id";
            const updateData = {
                title: "Updated Product",
                price: "200.00",
            };

            mockInstance.update.mockResolvedValue([0]); // Simulate no rows affected

            const result = await repository.updateProductById(productId, updateData);

            expect(result).toBeNull();
            expect(mockInstance.update).toHaveBeenCalledTimes(1);
            expect(mockInstance.update).toHaveBeenCalledWith(updateData, { where: { id: productId } });
            expect(mockInstance.findByPk).not.toHaveBeenCalled();

        });
    });

    describe("deleteProductById", () => {
        it("should delete a product by its ID", async () => {
            const productId = "1a093e48-7075-4c3e-805e-2d024cb4fb46";

            mockInstance.destroy.mockResolvedValue(1); // Simulate one row affected

            const result = await repository.deleteProductById(productId);

            expect(result).toBe(1);
            expect(mockInstance.destroy).toHaveBeenCalledTimes(1);
            expect(mockInstance.destroy).toHaveBeenCalledWith({ where: { id: productId } });
        });
    });

    describe("getProductsByUserId", () => {
        it("should return products by user ID", async () => {
            const userId = "550e8400-e29b-41d4-a716-446655440001";
            const products = [
                {
                    id: "1",
                    title: "Product 1",
                    description: "Description 1",
                    price: "100.00",
                    userId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: "2",
                    title: "Product 2",
                    description: "Description 2",
                    price: "200.00",
                    userId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ];

            mockInstance.findAll.mockResolvedValue(products);

            const result = await repository.getProductsByUserId(userId);

            expect(result).toEqual(products);
            expect(mockInstance.findAll).toHaveBeenCalledTimes(1);
            expect(mockInstance.findAll).toHaveBeenCalledWith({ where: { userId } });
        });

        it("should return an empty array if no products are found for the user", async () => {
            const userId = "550e8400-e29b-41d4-a716-446655440001";

            mockInstance.findAll.mockResolvedValue([]);

            const result = await repository.getProductsByUserId(userId);

            expect(result).toEqual([]);
            expect(mockInstance.findAll).toHaveBeenCalledTimes(1);
            expect(mockInstance.findAll).toHaveBeenCalledWith({ where: { userId } });
        });
    });
})