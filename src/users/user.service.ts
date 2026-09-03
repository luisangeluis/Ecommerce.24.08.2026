import { UserRepositoryInterface } from "./interfaces/user.repository.interface";
import { UserServiceInterface } from "./interfaces/user.service.interface";
import User, { UserCreationAttributes } from "./user.model";

export default class UserService implements UserServiceInterface {
    constructor(private readonly userRepository: UserRepositoryInterface) {}

    async createUser(data:UserCreationAttributes): Promise<User> {

        throw new Error("Method not implemented.");
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findUserByEmail(email);
    }

    async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return password === hashedPassword;
    }

}
