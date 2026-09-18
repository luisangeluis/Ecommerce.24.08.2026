import { getZod, InferSchema } from "../common/utils/getZod"
import { productResponseSchema } from "../products/product.dto";

const z = getZod();

export const createCartItemSchema = z.object({
    productId: z.uuidv4(),
    quantity: z.number()
})

export type CreateCartItemDto = InferSchema<typeof createCartItemSchema>;


export const cartItemResponseSchema = z.object({
    id: z.uuidv4(),
    quantity: z.int(),
    product: productResponseSchema
})

export type CartItemResponseDto = InferSchema<typeof cartItemResponseSchema>