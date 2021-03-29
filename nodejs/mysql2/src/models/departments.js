const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('departments', {
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
};
