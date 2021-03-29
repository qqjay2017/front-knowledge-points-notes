import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { employees, employeesId } from './employees';

export interface titlesAttributes {
  emp_no: number;
  title: string;
  from_date: string;
  to_date?: string;
}

export type titlesPk = "emp_no" | "title" | "from_date";
export type titlesId = titles[titlesPk];
export type titlesCreationAttributes = Optional<titlesAttributes, titlesPk>;

export class titles extends Model<titlesAttributes, titlesCreationAttributes> implements titlesAttributes {
  emp_no!: number;
  title!: string;
  from_date!: string;
  to_date?: string;

  // titles belongsTo employees via emp_no
  emp_no_employee!: employees;
  getEmp_no_employee!: Sequelize.BelongsToGetAssociationMixin<employees>;
  setEmp_no_employee!: Sequelize.BelongsToSetAssociationMixin<employees, employeesId>;
  createEmp_no_employee!: Sequelize.BelongsToCreateAssociationMixin<employees>;

  static initModel(sequelize: Sequelize.Sequelize): typeof titles {
    titles.init({
    emp_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "员工编号",
      references: {
        model: 'employees',
        key: 'emp_no'
      }
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    from_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    },
    to_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'titles',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "emp_no" },
          { name: "title" },
          { name: "from_date" },
        ]
      },
    ]
  });
  return titles;
  }
}
