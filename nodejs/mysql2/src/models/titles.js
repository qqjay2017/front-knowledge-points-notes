const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('titles', {
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
};
