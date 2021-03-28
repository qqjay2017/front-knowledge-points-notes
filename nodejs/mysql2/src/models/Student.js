const { Model ,DataTypes} = require("sequelize");
const { sequelize } = require('../lib/sequelize')
const { Course } = require('./Course')
const { StudentCourse } = require('./StudentCourse')
class Student extends Model {}

Student.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    name:{
        type:DataTypes.CHAR,
        allowNull:false
    },
    age:{
        type:DataTypes.INTEGER
    }
},{
    sequelize,
    timestamps:false,
    tableName:'students'
})



module.exports = {
    Student
}