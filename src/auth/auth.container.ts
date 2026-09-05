import { jwtExpiresIn, jwtSecret } from "../dev.env";
import { UserRepositoryInterface } from "../users/interfaces/user.repository.interface";
import { UserRepository } from "../users/user.repository";
import AuthController from "./auth.controller";
import { AuthRouter } from "./auth.router";
import AuthService from "./auth.service";
import { AuthControllerInterface } from "./interfaces/auth.controller.interface";
import { AuthRouterInterface } from "./interfaces/auth.router.interface";
import { AuthServiceInterface } from "./interfaces/auth.service.interface";
import { JWTServiceInterface } from "./interfaces/jwt.service.interface";
import { JWTService } from "./jwt.service";



export class AuthContainer {
    private readonly userRepository: UserRepositoryInterface;
    private readonly authService: AuthServiceInterface;
    private readonly authController: AuthControllerInterface;
    private readonly jwtService: JWTServiceInterface;
    private readonly authRouter: AuthRouterInterface;

    constructor() {
        this.userRepository = new UserRepository();
        this.jwtService = new JWTService(jwtSecret,jwtExpiresIn);
        this.authService = new AuthService(this.userRepository,this.jwtService);
        this.authController = new AuthController(this.authService);
        this.authRouter = new AuthRouter(this.authController);
    }

    getRouter(){
        return this.authRouter.getRouter();
    }
}