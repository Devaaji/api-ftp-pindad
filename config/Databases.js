import { Sequelize } from "sequelize";

const db = new Sequelize("database-ftp", "postgres", "0000", {
  host: "localhost",
  port: 8510,
  dialect: "postgres",
});

export default db;
