const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('coderhub', 'root', 'yourpassword', {
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = {
    sequelize
}