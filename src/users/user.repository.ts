import { UserRepositoryInterface } from "./interfaces/user.repository.interface";
import User, { UserCreationAttributes } from "./user.model";

export class UserRepository implements UserRepositoryInterface {
    async createUser(data:UserCreationAttributes): Promise<User> {
        const user = await User.create(data);
        
        return user;
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return await User.findOne({ where: { email } });
    }
}