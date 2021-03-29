const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employees', {
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
};
