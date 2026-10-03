import sequelize from "./sequelize.config"

export const connectDb = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
}

export const getTransaction = async () => {
    const t = await sequelize.transaction();
    return t;
}