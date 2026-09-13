import User from "../../users/user.model";
import sequelize from "../sequelize.config";

export const createUsersSeeder = async () => {
        const users = [
            {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
                password: "password123",
            }
        ];
    
        await User.bulkCreate(users,{ validate: true });
};

const run = async () => {
    try {
        await sequelize.authenticate();

        await createUsersSeeder();

        console.log("Users seeded successfully");
    } catch (error) {
        console.error(error);
    } finally {
        await sequelize.close();
    }
};

run();
