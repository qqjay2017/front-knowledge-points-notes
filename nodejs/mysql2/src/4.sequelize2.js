const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('./lib/sequelize');
const { Course } = require('./models/Course');

const { Student } = require('./models/Student')

const { StudentCourse } = require('./models/StudentCourse')

async function main() {
    try {
        await sequelize.authenticate()
        // const student = Student.build({
        //     name:'三号',
        //     age:98
        // })
        // 新增
        // student.save()
        // 查询




        Student.belongsToMany(Course, {
            through: StudentCourse,
            sourceKey:'id',
            targetKey:'student_id',
            timestamps:false

        });

        Course.belongsToMany(Student, {
            through: StudentCourse,
            sourceKey:'id',
            targetKey:'course_id',
            timestamps:false
        });


        Student.findAll({
           
        }).then(res=>{
            console.log(res)
        })
       
    } catch (error) {
        console.log('报错,', error)
    }
}

main()