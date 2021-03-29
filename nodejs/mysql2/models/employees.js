'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Employees.init({
    emp_no: DataTypes.INTEGER,
    birth_date: DataTypes.DATE,
    first_name: DataTypes.CHAR,
    last_name: DataTypes.CHAR,
    gender: DataTypes.CHAR,
    hire_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Employees',
  });
  return Employees;
};