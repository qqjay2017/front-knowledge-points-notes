import Sequelize, { DataTypes, Model, Optional } from 'sequelize';

export interface rolesAttributes {
  id: number;
  role_name: string;
  description?: string;
}

export type rolesPk = "id";
export type rolesId = roles[rolesPk];
export type rolesCreationAttributes = Optional<rolesAttributes, rolesPk>;

export class roles extends Model<rolesAttributes, rolesCreationAttributes> implements rolesAttributes {
  id!: number;
  role_name!: string;
  description?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof roles {
    roles.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    role_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'roles',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return roles;
  }
}
