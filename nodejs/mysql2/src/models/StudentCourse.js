const { Model ,DataTypes} = require("sequelize");
const {  Student } = require('./Student')
const { Course} = require('./Course')
const { sequelize } = require('../lib/sequelize')

class StudentCourse extends Model {}

StudentCourse.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    student_id:{
        type:DataTypes.INTEGER,
        references:{
                model:Student,
                key:'id'
        }
    },
    course_id:{
        type:DataTypes.INTEGER,
        references:{
                model:Course,
                key:'id'
        }
    }
},{
    sequelize,
    timestamps:false,
    tableName:'student_course'
})

module.exports = {
    StudentCourse
}