const { Model ,DataTypes} = require("sequelize");
const { sequelize } = require('../lib/sequelize')
const { Student } = require('./Student');
const { StudentCourse } = require("./StudentCourse");

class Course extends Model {}

Course.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    name:{
        type:DataTypes.CHAR,
        allowNull:false
    },
    price:{
        type:DataTypes.INTEGER
    }
},{
    sequelize,
    timestamps:false,
    tableName:'courses'
})



module.exports = {
    Course
}