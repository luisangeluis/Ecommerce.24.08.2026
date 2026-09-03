import jwt, { SignOptions } from "jsonwebtoken";

export class JWTService {
    constructor(private readonly jwtSecret: string, private readonly expiresIn: string) { }

    generateToken(userId: string) {
        return jwt.sign(
            { userId },
            this.jwtSecret,
            { expiresIn: this.expiresIn as SignOptions["expiresIn"] }
        );
    }
}