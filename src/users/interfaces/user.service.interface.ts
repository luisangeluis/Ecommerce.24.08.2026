import { SafeUserResponseDto } from "../user.dto";
import User, { UserCreationAttributes } from "../user.model";

export interface UserServiceInterface {
    createUser(data:UserCreationAttributes): Promise<User>;
    findUserByEmail(email: string): Promise<SafeUserResponseDto>;
}