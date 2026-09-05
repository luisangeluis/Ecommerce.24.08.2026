import { log } from "console";
import { UserRepositoryInterface } from "./interfaces/user.repository.interface";
import User, { UserCreationAttributes } from "./user.model";

export class UserRepository implements UserRepositoryInterface {
    async createUser(data: UserCreationAttributes): Promise<User> {
        const user = await User.create(data);

        return user;
    }
    
    /*
        @param email - The user's email
        @param raw - If true, returns a plain object instead of a Sequelize model instance.
        @returns The user matching the email, or null if no user is found.
    */
    async findUserByEmail(email: string, raw: boolean = false): Promise<User | null> {
        return await User.findOne({ where: { email }, raw });
    }

    async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return password == hashedPassword;
    }
}