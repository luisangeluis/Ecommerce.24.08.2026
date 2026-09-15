import { getZod, InferSchema } from "../common/utils/getZod"
import { productResponseSchema } from "../products/product.dto";

const z = getZod();

export const cartItemResponseSchema = z.object({
    id: z.uuidv4(),
    quantity: z.int(),
    product: productResponseSchema
})

export type CartItemResponseDto = InferSchema<typeof cartItemResponseSchema>