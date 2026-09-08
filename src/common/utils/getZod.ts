import { z } from "zod";

export const getZod =()=>z;

export type InferSchema<T extends z.ZodType> = z.infer<T>