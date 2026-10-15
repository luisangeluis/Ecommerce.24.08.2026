import { ZodError } from "zod";

export class ResponseValidationError extends Error {
    public readonly statusCode = 500;

    constructor(public readonly cause: ZodError) {
        super("Response validation failed");
        this.name = "ResponseValidationError";
    }
}