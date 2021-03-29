var DataTypes = require("sequelize").DataTypes;
var _SequelizeMeta = require("./SequelizeMeta");
var _departments = require("./departments");
var _dept_emp = require("./dept_emp");
var _employees = require("./employees");
var _roles = require("./roles");
var _salaries = require("./salaries");
var _titles = require("./titles");

function initModels(sequelize) {
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var departments = _departments(sequelize, DataTypes);
  var dept_emp = _dept_emp(sequelize, DataTypes);
  var employees = _employees(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var salaries = _salaries(sequelize, DataTypes);
  var titles = _titles(sequelize, DataTypes);

  departments.belongsToMany(employees, { as: 'emp_no_employees', through: dept_emp, foreignKey: "dept_no", otherKey: "emp_no" });
  employees.belongsToMany(departments, { as: 'dept_no_departments', through: dept_emp, foreignKey: "emp_no", otherKey: "dept_no" });
  dept_emp.belongsTo(departments, { as: "dept_no_department", foreignKey: "dept_no" });
  departments.hasMany(dept_emp, { as: "dept_emps", foreignKey: "dept_no" });
  dept_emp.belongsTo(employees, { as: "emp_no_employee", foreignKey: "emp_no" });
  employees.hasMany(dept_emp, { as: "dept_emps", foreignKey: "emp_no" });
  salaries.belongsTo(employees, { as: "emp_no_employee", foreignKey: "emp_no" });
  employees.hasMany(salaries, { as: "salaries", foreignKey: "emp_no" });
  titles.belongsTo(employees, { as: "emp_no_employee", foreignKey: "emp_no" });
  employees.hasMany(titles, { as: "titles", foreignKey: "emp_no" });

  return {
    SequelizeMeta,
    departments,
    dept_emp,
    employees,
    roles,
    salaries,
    titles,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
