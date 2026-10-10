import { ZodError } from "zod";
import { AppError } from "./appError";

export class BadRequestError extends AppError {
    constructor(public message = "Bad request error", public readonly errors: ZodError["issues"] | null = null) {
        super(400, message);

    }
}