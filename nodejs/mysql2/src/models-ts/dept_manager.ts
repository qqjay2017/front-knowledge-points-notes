import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { departments, departmentsId } from './departments';
import type { employees, employeesId } from './employees';

export interface dept_managerAttributes {
  emp_no: number;
  dept_no: string;
  from_date: string;
  to_date: string;
}

export type dept_managerPk = "emp_no" | "dept_no";
export type dept_managerId = dept_manager[dept_managerPk];
export type dept_managerCreationAttributes = Optional<dept_managerAttributes, dept_managerPk>;

export class dept_manager extends Model<dept_managerAttributes, dept_managerCreationAttributes> implements dept_managerAttributes {
  emp_no!: number;
  dept_no!: string;
  from_date!: string;
  to_date!: string;

  // dept_manager belongsTo departments via dept_no
  dept_no_department!: departments;
  getDept_no_department!: Sequelize.BelongsToGetAssociationMixin<departments>;
  setDept_no_department!: Sequelize.BelongsToSetAssociationMixin<departments, departmentsId>;
  createDept_no_department!: Sequelize.BelongsToCreateAssociationMixin<departments>;
  // dept_manager belongsTo employees via emp_no
  emp_no_employee!: employees;
  getEmp_no_employee!: Sequelize.BelongsToGetAssociationMixin<employees>;
  setEmp_no_employee!: Sequelize.BelongsToSetAssociationMixin<employees, employeesId>;
  createEmp_no_employee!: Sequelize.BelongsToCreateAssociationMixin<employees>;

  static initModel(sequelize: Sequelize.Sequelize): typeof dept_manager {
    dept_manager.init({
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
    tableName: 'dept_manager',
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
  return dept_manager;
  }
}
