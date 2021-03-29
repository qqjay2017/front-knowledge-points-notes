import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { departments, departmentsId } from './departments';
import type { employees, employeesId } from './employees';

export interface dept_empAttributes {
  emp_no: number;
  dept_no: string;
  from_date: string;
  to_date: string;
}

export type dept_empPk = "emp_no" | "dept_no";
export type dept_empId = dept_emp[dept_empPk];
export type dept_empCreationAttributes = Optional<dept_empAttributes, dept_empPk>;

export class dept_emp extends Model<dept_empAttributes, dept_empCreationAttributes> implements dept_empAttributes {
  emp_no!: number;
  dept_no!: string;
  from_date!: string;
  to_date!: string;

  // dept_emp belongsTo departments via dept_no
  dept_no_department!: departments;
  getDept_no_department!: Sequelize.BelongsToGetAssociationMixin<departments>;
  setDept_no_department!: Sequelize.BelongsToSetAssociationMixin<departments, departmentsId>;
  createDept_no_department!: Sequelize.BelongsToCreateAssociationMixin<departments>;
  // dept_emp belongsTo employees via emp_no
  emp_no_employee!: employees;
  getEmp_no_employee!: Sequelize.BelongsToGetAssociationMixin<employees>;
  setEmp_no_employee!: Sequelize.BelongsToSetAssociationMixin<employees, employeesId>;
  createEmp_no_employee!: Sequelize.BelongsToCreateAssociationMixin<employees>;

  static initModel(sequelize: Sequelize.Sequelize): typeof dept_emp {
    dept_emp.init({
    emp_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'employees',
        key: 'emp_no'
      }
    },
    dept_no: {
      type: DataTypes.CHAR(4),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'departments',
        key: 'dept_no'
      }
    },
    from_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    to_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'dept_emp',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "emp_no" },
          { name: "dept_no" },
        ]
      },
      {
        name: "dept_no",
        using: "BTREE",
        fields: [
          { name: "dept_no" },
        ]
      },
    ]
  });
  return dept_emp;
  }
}
