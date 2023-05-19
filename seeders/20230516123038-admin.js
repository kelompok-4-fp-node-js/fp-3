"use strict";
const bcrypt= require('../helpers/bcrypt') 
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "User",
      [
        {
          full_name: "John Doe",
          email: "johndoe@gmail.com",
          password: bcrypt.hashPassword("josh123") ,
          gender: "male",
          role: "admin",
          balance: 100000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {},
};
