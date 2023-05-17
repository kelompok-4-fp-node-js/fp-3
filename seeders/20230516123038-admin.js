"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "User",
      [
        {
          full_name: "John Doe",
          email: "johndoe@gmail.com",
          password: "josh123",
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
