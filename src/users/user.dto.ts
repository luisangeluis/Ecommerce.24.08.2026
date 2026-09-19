import { getZod, InferSchema } from "../common/utils/getZod"

const z = getZod();

export const userResponseSchema = z.object({
    id: z.uuidv4(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type UserResponseDto = InferSchema<typeof userResponseSchema>;


export const safeUserResponseSchema = userResponseSchema.omit({
    password: true
})

export type SafeUserResponseDto = InferSchema<typeof safeUserResponseSchema>;