'use strict';
const bcrypt= require('../helpers/bcrypt') 
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('User', [{
      full_name : "admin",
      password:bcrypt.hashPassword('admin'),
      gender:"male",
      email:"admin@gmail.com",
      role :'admin',
      createdAt:new Date(),
      updatedAt:new Date()
     }], {});
    
  },

  async down (queryInterface, Sequelize) {

  }
};
