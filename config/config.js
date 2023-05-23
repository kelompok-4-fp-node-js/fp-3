require("dotenv").config();

module.exports = {
  development: {
    // url :process.env.DB_URL,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port : process.env.DB_PORT,
    dialect: "postgres"
  },
  test: {
    // url :process.env.DB_URL,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST,
    port : process.env.DB_PORT,
    dialect: "postgres",
  },
  production: {
    // url :process.env.DB_URL,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_PRODUCTION,
    host: process.env.DB_HOST,
    port : process.env.DB_PORT,
    dialect: "postgres",
  },
};
