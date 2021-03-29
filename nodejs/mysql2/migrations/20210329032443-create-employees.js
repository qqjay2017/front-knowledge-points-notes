'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      emp_no: {
        type: Sequelize.INTEGER
      },
      birth_date: {
        type: Sequelize.DATE
      },
      first_name: {
        type: Sequelize.CHAR
      },
      last_name: {
        type: Sequelize.CHAR
      },
      gender: {
        type: Sequelize.CHAR
      },
      hire_date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Employees');
  }
};