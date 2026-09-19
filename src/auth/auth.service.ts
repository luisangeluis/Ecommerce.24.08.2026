import { AuthServiceInterface } from "./interfaces/auth.service.interface";
import { UserRepositoryInterface } from "../users/interfaces/user.repository.interface";
import { JWTServiceInterface } from "./interfaces/jwt.service.interface";
import { InvalidCredentials } from "../common/errors/invalidCredentials.error";


export default class AuthService implements AuthServiceInterface {
    constructor(private readonly userRepository: UserRepositoryInterface,
        private readonly jwtSecret: JWTServiceInterface
    ) { }

    async login(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findUserByEmail(email);

        if (!user) {
            throw new InvalidCredentials();
        }

        const plainUser = user.toJSON();
        const isPasswordValid = this.userRepository.validatePassword(password, plainUser.password);

        if (!isPasswordValid) {
            throw new InvalidCredentials();
        }

        return this.jwtSecret.generateToken(user.id);
    }


}