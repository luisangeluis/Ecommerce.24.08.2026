export const baseUrl = process.env.BASE_URL;
// AUTH
export const jwtSecret = process.env.JWT_SECRET || "secret jwt key";
export const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "1h";
// MYSQL
export const mysqlHost = process.env.MYSQL_HOST;
export const mysqlDatabase = process.env.MYSQL_DATABASE;
export const mysqlUser = process.env.MYSQL_USER;
export const mysqlRootPassword = process.env.MYSQL_ROOT_PASSWORD;
export const mysqlPort = process.env.MYSQL_PORT;
