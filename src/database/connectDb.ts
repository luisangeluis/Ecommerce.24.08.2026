import sequelize from "./sequelize.config"

export const connectDb=async()=>{
    try{
        await sequelize.authenticate();
        await sequelize.sync({force:true});

    }catch(err){
          console.error('Unable to connect to the database:', err);
    }
}