import rateLimit from "express-rate-limit";
import type { Options } from "express-rate-limit"

export const getRateLimit = (options?: Partial<Options>) => {
    return rateLimit({
        windowMs: 60 * 1000, // Un minuto
        limit: 50, // 100 peticiones
        standardHeaders: "draft-8",
        legacyHeaders: false,
        ...options
    })
}