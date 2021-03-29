import type { Sequelize, Model } from "sequelize";
import { SequelizeMeta } from "./SequelizeMeta";
import type { SequelizeMetaAttributes, SequelizeMetaCreationAttributes } from "./SequelizeMeta";
import { departments } from "./departments";
import type { departmentsAttributes, departmentsCreationAttributes } from "./departments";
import { dept_emp } from "./dept_emp";
import type { dept_empAttributes, dept_empCreationAttributes } from "./dept_emp";
import { dept_manager } from "./dept_manager";
import type { dept_managerAttributes, dept_managerCreationAttributes } from "./dept_manager";
import { employees } from "./employees";
import type { employeesAttributes, employeesCreationAttributes } from "./employees";
import { roles } from "./roles";
import type { rolesAttributes, rolesCreationAttributes } from "./roles";
import { salaries } from "./salaries";
import type { salariesAttributes, salariesCreationAttributes } from "./salaries";
import { titles } from "./titles";
import type { titlesAttributes, titlesCreationAttributes } from "./titles";

export {
  SequelizeMeta,
  departments,
  dept_emp,
  dept_manager,
  employees,
  roles,
  salaries,
  titles,
};

export type {
  SequelizeMetaAttributes,
  SequelizeMetaCreationAttributes,
  departmentsAttributes,
  departmentsCreationAttributes,
  dept_empAttributes,
  dept_empCreationAttributes,
  dept_managerAttributes,
  dept_managerCreationAttributes,
  employeesAttributes,
  employeesCreationAttributes,
  rolesAttributes,
  rolesCreationAttributes,
  salariesAttributes,
  salariesCreationAttributes,
  titlesAttributes,
  titlesCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  SequelizeMeta.initModel(sequelize);
  departments.initModel(sequelize);
  dept_emp.initModel(sequelize);
  dept_manager.initModel(sequelize);
  employees.initModel(sequelize);
  roles.initModel(sequelize);
  salaries.initModel(sequelize);
  titles.initModel(sequelize);

  departments.belongsToMany(employees, { as: 'emp_no_employees', through: dept_emp as typeof Model, foreignKey: "dept_no", otherKey: "emp_no" });
  departments.belongsToMany(employees, { as: 'emp_no_employees', through: dept_manager as typeof Model, foreignKey: "dept_no", otherKey: "emp_no" });
  employees.belongsToMany(departments, { as: 'dept_no_departments', through: dept_emp as typeof Model, foreignKey: "emp_no", otherKey: "dept_no" });
  employees.belongsToMany(departments, { as: 'dept_no_departments', through: dept_manager as typeof Model, foreignKey: "emp_no", otherKey: "dept_no" });
  dept_emp.belongsTo(departments, { as: "dept_no_department", foreignKey: "dept_no"});
  departments.hasMany(dept_emp, { as: "dept_emps", foreignKey: "dept_no"});
  dept_manager.belongsTo(departments, { as: "dept_no_department", foreignKey: "dept_no"});
  departments.hasMany(dept_manager, { as: "dept_managers", foreignKey: "dept_no"});
  dept_emp.belongsTo(employees, { as: "emp_no_employee", foreignKey: "emp_no"});
  employees.hasMany(dept_emp, { as: "dept_emps", foreignKey: "emp_no"});
  dept_manager.belongsTo(employees, { as: "emp_no_employee", foreignKey: "emp_no"});
  employees.hasMany(dept_manager, { as: "dept_managers", foreignKey: "emp_no"});
  salaries.belongsTo(employees, { as: "emp_no_employee", foreignKey: "emp_no"});
  employees.hasMany(salaries, { as: "salaries", foreignKey: "emp_no"});
  titles.belongsTo(employees, { as: "emp_no_employee", foreignKey: "emp_no"});
  employees.hasMany(titles, { as: "titles", foreignKey: "emp_no"});

  return {
    SequelizeMeta: SequelizeMeta,
    departments: departments,
    dept_emp: dept_emp,
    dept_manager: dept_manager,
    employees: employees,
    roles: roles,
    salaries: salaries,
    titles: titles,
  };
}
