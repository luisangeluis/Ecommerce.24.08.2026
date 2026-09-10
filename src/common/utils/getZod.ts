import { z, ZodType } from "zod";

export type InferSchema<T extends z.ZodType> = z.infer<T>

export const getZod = () => z;

export type { ZodType }