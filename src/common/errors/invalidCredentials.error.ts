import { AppError } from "./appError";

export class InvalidCredentials extends AppError {
    constructor(message = "Invalid credentials") {
        super(401, message);

    }
}