import { ProductRepository } from "../product.repository";
import Product from "../product.model";
import { CreatedAt } from "sequelize-typescript";

describe("ProductRepository", () => {
    let repository: ProductRepository;

    const mockFindAll = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        repository = new ProductRepository({
            findAll: mockFindAll,
        } as unknown as typeof Product);
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

            mockFindAll.mockResolvedValue(products);

            const result = await repository.getAllProducts();

            expect(result).toEqual(products);
            expect(mockFindAll).toHaveBeenCalledTimes(1);
        });
    });


})