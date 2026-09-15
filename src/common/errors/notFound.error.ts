import { AppError } from "./appError";

export class NotFoundError extends AppError {
    constructor(public message = "Resource not found") {
        super(404, message);

    }
}