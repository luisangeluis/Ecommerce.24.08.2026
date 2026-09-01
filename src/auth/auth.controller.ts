import { AuthControllerInterface } from "./interfaces/auth.interface";

export default class AuthController implements AuthControllerInterfacee {
    constructor(private readonly authService: AuthService) { }

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const token = await this.authService.login(email, password);
        return res.status(200).json({ token });
    }

    register = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const user = await this.authService.register(email, password);
        return res.status(201).json(user);
    }
}