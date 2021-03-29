import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { departments, departmentsId } from './departments';
import type { dept_emp, dept_empId } from './dept_emp';
import type { dept_manager, dept_managerId } from './dept_manager';
import type { salaries, salariesId } from './salaries';
import type { titles, titlesId } from './titles';

export interface employeesAttributes {
  emp_no: number;
  birth_date: string;
  first_name: string;
  last_name: string;
  gender: 'M' | 'F';
  hire_date: string;
}

export type employeesPk = "emp_no";
export type employeesId = employees[employeesPk];
export type employeesCreationAttributes = Optional<employeesAttributes, employeesPk>;

export class employees extends Model<employeesAttributes, employeesCreationAttributes> implements employeesAttributes {
  emp_no!: number;
  birth_date!: string;
  first_name!: string;
  last_name!: string;
  gender!: 'M' | 'F';
  hire_date!: string;

  // employees belongsToMany departments via emp_no and dept_no
  dept_no_departments!: departments[];
  getDept_no_departments!: Sequelize.BelongsToManyGetAssociationsMixin<departments>;
  setDept_no_departments!: Sequelize.BelongsToManySetAssociationsMixin<departments, departmentsId>;
  addDept_no_department!: Sequelize.BelongsToManyAddAssociationMixin<departments, departmentsId>;
  addDept_no_departments!: Sequelize.BelongsToManyAddAssociationsMixin<departments, departmentsId>;
  createDept_no_department!: Sequelize.BelongsToManyCreateAssociationMixin<departments>;
  removeDept_no_department!: Sequelize.BelongsToManyRemoveAssociationMixin<departments, departmentsId>;
  removeDept_no_departments!: Sequelize.BelongsToManyRemoveAssociationsMixin<departments, departmentsId>;
  hasDept_no_department!: Sequelize.BelongsToManyHasAssociationMixin<departments, departmentsId>;
  hasDept_no_departments!: Sequelize.BelongsToManyHasAssociationsMixin<departments, departmentsId>;
  countDept_no_departments!: Sequelize.BelongsToManyCountAssociationsMixin;
  // employees belongsToMany departments via emp_no and dept_no
  dept_no_departments!: departments[];
  getDept_no_departments!: Sequelize.BelongsToManyGetAssociationsMixin<departments>;
  setDept_no_departments!: Sequelize.BelongsToManySetAssociationsMixin<departments, departmentsId>;
  addDept_no_department!: Sequelize.BelongsToManyAddAssociationMixin<departments, departmentsId>;
  addDept_no_departments!: Sequelize.BelongsToManyAddAssociationsMixin<departments, departmentsId>;
  createDept_no_department!: Sequelize.BelongsToManyCreateAssociationMixin<departments>;
  removeDept_no_department!: Sequelize.BelongsToManyRemoveAssociationMixin<departments, departmentsId>;
  removeDept_no_departments!: Sequelize.BelongsToManyRemoveAssociationsMixin<departments, departmentsId>;
  hasDept_no_department!: Sequelize.BelongsToManyHasAssociationMixin<departments, departmentsId>;
  hasDept_no_departments!: Sequelize.BelongsToManyHasAssociationsMixin<departments, departmentsId>;
  countDept_no_departments!: Sequelize.BelongsToManyCountAssociationsMixin;
  // employees hasMany dept_emp via emp_no
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
  // employees hasMany dept_manager via emp_no
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
  // employees hasMany salaries via emp_no
  salaries!: salaries[];
  getSalaries!: Sequelize.HasManyGetAssociationsMixin<salaries>;
  setSalaries!: Sequelize.HasManySetAssociationsMixin<salaries, salariesId>;
  addSalary!: Sequelize.HasManyAddAssociationMixin<salaries, salariesId>;
  addSalaries!: Sequelize.HasManyAddAssociationsMixin<salaries, salariesId>;
  createSalary!: Sequelize.HasManyCreateAssociationMixin<salaries>;
  removeSalary!: Sequelize.HasManyRemoveAssociationMixin<salaries, salariesId>;
  removeSalaries!: Sequelize.HasManyRemoveAssociationsMixin<salaries, salariesId>;
  hasSalary!: Sequelize.HasManyHasAssociationMixin<salaries, salariesId>;
  hasSalaries!: Sequelize.HasManyHasAssociationsMixin<salaries, salariesId>;
  countSalaries!: Sequelize.HasManyCountAssociationsMixin;
  // employees hasMany titles via emp_no
  titles!: titles[];
  getTitles!: Sequelize.HasManyGetAssociationsMixin<titles>;
  setTitles!: Sequelize.HasManySetAssociationsMixin<titles, titlesId>;
  addTitle!: Sequelize.HasManyAddAssociationMixin<titles, titlesId>;
  addTitles!: Sequelize.HasManyAddAssociationsMixin<titles, titlesId>;
  createTitle!: Sequelize.HasManyCreateAssociationMixin<titles>;
  removeTitle!: Sequelize.HasManyRemoveAssociationMixin<titles, titlesId>;
  removeTitles!: Sequelize.HasManyRemoveAssociationsMixin<titles, titlesId>;
  hasTitle!: Sequelize.HasManyHasAssociationMixin<titles, titlesId>;
  hasTitles!: Sequelize.HasManyHasAssociationsMixin<titles, titlesId>;
  countTitles!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof employees {
    employees.init({
    emp_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(14),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM('M','F'),
      allowNull: false
    },
    hire_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'employees',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "emp_no" },
        ]
      },
    ]
  });
  return employees;
  }
}
