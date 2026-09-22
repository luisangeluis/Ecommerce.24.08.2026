import { AuthPayload } from "../middlewares/validateAuth.middleware";

export interface JWTServiceInterface {
    generateToken(userId: string): string;
}