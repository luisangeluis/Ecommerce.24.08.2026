import jwt, { SignOptions } from "jsonwebtoken";
import { JWTServiceInterface } from "./interfaces/jwt.service.interface";

export class JWTService implements JWTServiceInterface{
    constructor(private readonly jwtSecret: string, private readonly expiresIn: string) { }

    generateToken(userId: string) {
        return jwt.sign(
            { userId },
            this.jwtSecret,
            { expiresIn: this.expiresIn as SignOptions["expiresIn"] }
        );
    }
}