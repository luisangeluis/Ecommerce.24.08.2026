import { NextFunction, Request, Response } from "express";
import { getZod, InferSchema } from "../common/utils/getZod";

const z = getZod();

export const createProductSchema = z.object({
    title: z.string().min(2).max(255),
    description: z.string().min(2).max(1000),
    price: z.number().min(0).transform(price => price.toFixed(2)),
})

export type CreateProductDto = InferSchema<typeof createProductSchema>

export const productResponseSchema = z.object({
    id: z.uuidv4(),
    title: z.string(),
    description: z.string(),
    price: z.string(),
    userId: z.uuidv4(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type ProductResponseDto = InferSchema<typeof productResponseSchema>;