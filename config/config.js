require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "fp_3_development",
    host: "rosie.db.elephantsql.com",
    dialect: "postgres"
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "fp_3_test",
    host: "rosie.db.elephantsql.com",
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "fp_3_production",
    host: "rosie.db.elephantsql.com",
    dialect: "postgres",
  },
};
