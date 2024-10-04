import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const dataBaseConfig: SequelizeModuleOptions = {
  // Database dialect - in this case, MySQL is being used
  dialect: 'mysql',

  // Host address of the database server (fetched from environment variables)
  host: process.env.DB_HOST,

  // Port number where the database is running (cast to number from string)
  port: +process.env.DB_PORT,

  // Credentials for connecting to the database
  username: process.env.DB_ROOT_USER,
  password: process.env.DB_ROOT_PASSWORD,

  // Name of the database to connect to
  database: process.env.DB_NAME,

  // Automatically load models defined in the application
  autoLoadModels: true,

  // Synchronize models with the database (auto-creates tables if they don't exist)
  synchronize: true,
};
