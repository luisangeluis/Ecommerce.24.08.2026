import { AppError } from "./appError";

export class BadRequestError extends AppError {
    constructor(public message = "Bad request") {
        super(400, message);

    }
}