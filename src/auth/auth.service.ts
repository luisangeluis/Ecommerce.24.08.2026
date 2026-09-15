import jwt, { SignOptions } from "jsonwebtoken";
import { jwtExpiresIn, jwtSecret } from "../dev.env";
import { AuthServiceInterface } from "./interfaces/auth.service.interface";
import { UserServiceInterface } from "../users/interfaces/user.service.interface";
import { JWTService } from "./jwt.service";
import { UserRepositoryInterface } from "../users/interfaces/user.repository.interface";
import { JWTServiceInterface } from "./interfaces/jwt.service.interface";
import { AppError } from "../common/errors/appError";
import { InvalidCredentials } from "../common/errors/invalidCredentials.error";


export default class AuthService implements AuthServiceInterface {
    constructor(private readonly userRepository: UserRepositoryInterface,
        private readonly jwtSecret: JWTServiceInterface
    ) { }

    async login(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findUserByEmail(email,true);
        console.log(user);

        if (!user) {
            throw new InvalidCredentials();
        }

        const isPasswordValid = await this.userRepository.validatePassword(password, user.password);
        
        if (!isPasswordValid) {
            throw new InvalidCredentials();
        }

        return this.jwtSecret.generateToken(user.id);
    }


}