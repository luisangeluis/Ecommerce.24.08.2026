import { Model } from "sequelize";
import { getZod, InferSchema } from "../common/utils/getZod"
import Cart from "./cart.model";
import { productResponseSchema } from "../products/product.dto";

const z = getZod();

export const cartItemResponseSchema = z.object({
    id: z.uuidv4(),
    quantity: z.int(),
    product: productResponseSchema
})



export const cartResponseSchema = z.object({
    id: z.uuidv4(),
    userId: z.uuidv4(),
    isActive: z.boolean(),
    cartItems: z.array(cartItemResponseSchema)
})

export type CartResponseDto = InferSchema<typeof cartResponseSchema>