import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { employees, employeesId } from './employees';

export interface salariesAttributes {
  emp_no: number;
  salary: number;
  from_date: string;
  to_date: string;
}

export type salariesPk = "emp_no" | "from_date";
export type salariesId = salaries[salariesPk];
export type salariesCreationAttributes = Optional<salariesAttributes, salariesPk>;

export class salaries extends Model<salariesAttributes, salariesCreationAttributes> implements salariesAttributes {
  emp_no!: number;
  salary!: number;
  from_date!: string;
  to_date!: string;

  // salaries belongsTo employees via emp_no
  emp_no_employee!: employees;
  getEmp_no_employee!: Sequelize.BelongsToGetAssociationMixin<employees>;
  setEmp_no_employee!: Sequelize.BelongsToSetAssociationMixin<employees, employeesId>;
  createEmp_no_employee!: Sequelize.BelongsToCreateAssociationMixin<employees>;

  static initModel(sequelize: Sequelize.Sequelize): typeof salaries {
    salaries.init({
    emp_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'employees',
        key: 'emp_no'
      }
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    from_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    },
    to_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'salaries',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "emp_no" },
          { name: "from_date" },
        ]
      },
    ]
  });
  return salaries;
  }
}
