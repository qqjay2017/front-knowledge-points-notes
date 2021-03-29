import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { dept_emp, dept_empId } from './dept_emp';
import type { dept_manager, dept_managerId } from './dept_manager';
import type { employees, employeesId } from './employees';

export interface departmentsAttributes {
  dept_no: string;
  dept_name: string;
}

export type departmentsPk = "dept_no";
export type departmentsId = departments[departmentsPk];
export type departmentsCreationAttributes = Optional<departmentsAttributes, departmentsPk>;

export class departments extends Model<departmentsAttributes, departmentsCreationAttributes> implements departmentsAttributes {
  dept_no!: string;
  dept_name!: string;

  // departments hasMany dept_emp via dept_no
  dept_emps!: dept_emp[];
  getDept_emps!: Sequelize.HasManyGetAssociationsMixin<dept_emp>;
  setDept_emps!: Sequelize.HasManySetAssociationsMixin<dept_emp, dept_empId>;
  addDept_emp!: Sequelize.HasManyAddAssociationMixin<dept_emp, dept_empId>;
  addDept_emps!: Sequelize.HasManyAddAssociationsMixin<dept_emp, dept_empId>;
  createDept_emp!: Sequelize.HasManyCreateAssociationMixin<dept_emp>;
  removeDept_emp!: Sequelize.HasManyRemoveAssociationMixin<dept_emp, dept_empId>;
  removeDept_emps!: Sequelize.HasManyRemoveAssociationsMixin<dept_emp, dept_empId>;
  hasDept_emp!: Sequelize.HasManyHasAssociationMixin<dept_emp, dept_empId>;
  hasDept_emps!: Sequelize.HasManyHasAssociationsMixin<dept_emp, dept_empId>;
  countDept_emps!: Sequelize.HasManyCountAssociationsMixin;
  // departments hasMany dept_manager via dept_no
  dept_managers!: dept_manager[];
  getDept_managers!: Sequelize.HasManyGetAssociationsMixin<dept_manager>;
  setDept_managers!: Sequelize.HasManySetAssociationsMixin<dept_manager, dept_managerId>;
  addDept_manager!: Sequelize.HasManyAddAssociationMixin<dept_manager, dept_managerId>;
  addDept_managers!: Sequelize.HasManyAddAssociationsMixin<dept_manager, dept_managerId>;
  createDept_manager!: Sequelize.HasManyCreateAssociationMixin<dept_manager>;
  removeDept_manager!: Sequelize.HasManyRemoveAssociationMixin<dept_manager, dept_managerId>;
  removeDept_managers!: Sequelize.HasManyRemoveAssociationsMixin<dept_manager, dept_managerId>;
  hasDept_manager!: Sequelize.HasManyHasAssociationMixin<dept_manager, dept_managerId>;
  hasDept_managers!: Sequelize.HasManyHasAssociationsMixin<dept_manager, dept_managerId>;
  countDept_managers!: Sequelize.HasManyCountAssociationsMixin;
  // departments belongsToMany employees via dept_no and emp_no
  emp_no_employees!: employees[];
  getEmp_no_employees!: Sequelize.BelongsToManyGetAssociationsMixin<employees>;
  setEmp_no_employees!: Sequelize.BelongsToManySetAssociationsMixin<employees, employeesId>;
  addEmp_no_employee!: Sequelize.BelongsToManyAddAssociationMixin<employees, employeesId>;
  addEmp_no_employees!: Sequelize.BelongsToManyAddAssociationsMixin<employees, employeesId>;
  createEmp_no_employee!: Sequelize.BelongsToManyCreateAssociationMixin<employees>;
  removeEmp_no_employee!: Sequelize.BelongsToManyRemoveAssociationMixin<employees, employeesId>;
  removeEmp_no_employees!: Sequelize.BelongsToManyRemoveAssociationsMixin<employees, employeesId>;
  hasEmp_no_employee!: Sequelize.BelongsToManyHasAssociationMixin<employees, employeesId>;
  hasEmp_no_employees!: Sequelize.BelongsToManyHasAssociationsMixin<employees, employeesId>;
  countEmp_no_employees!: Sequelize.BelongsToManyCountAssociationsMixin;
  // departments belongsToMany employees via dept_no and emp_no
  emp_no_employees!: employees[];
  getEmp_no_employees!: Sequelize.BelongsToManyGetAssociationsMixin<employees>;
  setEmp_no_employees!: Sequelize.BelongsToManySetAssociationsMixin<employees, employeesId>;
  addEmp_no_employee!: Sequelize.BelongsToManyAddAssociationMixin<employees, employeesId>;
  addEmp_no_employees!: Sequelize.BelongsToManyAddAssociationsMixin<employees, employeesId>;
  createEmp_no_employee!: Sequelize.BelongsToManyCreateAssociationMixin<employees>;
  removeEmp_no_employee!: Sequelize.BelongsToManyRemoveAssociationMixin<employees, employeesId>;
  removeEmp_no_employees!: Sequelize.BelongsToManyRemoveAssociationsMixin<employees, employeesId>;
  hasEmp_no_employee!: Sequelize.BelongsToManyHasAssociationMixin<employees, employeesId>;
  hasEmp_no_employees!: Sequelize.BelongsToManyHasAssociationsMixin<employees, employeesId>;
  countEmp_no_employees!: Sequelize.BelongsToManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof departments {
    departments.init({
    dept_no: {
      type: DataTypes.CHAR(4),
      allowNull: false,
      primaryKey: true
    },
    dept_name: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: "dept_name"
    }
  }, {
    sequelize,
    tableName: 'departments',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "dept_no" },
        ]
      },
      {
        name: "dept_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "dept_name" },
        ]
      },
    ]
  });
  return departments;
  }
}
