'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('User', [{
     name: 'John Doe',
     isBetaMember: false
     }], {});
    
  },

  async down (queryInterface, Sequelize) {

  }
};
