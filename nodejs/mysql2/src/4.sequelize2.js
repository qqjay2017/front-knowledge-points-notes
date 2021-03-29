
const { Op } = require('sequelize');
const { sequelize } = require('./lib/sequelize');


const { Student } = require('./models/Student')


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

        const student = await Student.findAll({
            where: {
                age: {
                    [Op.gt]: 30
                }
            },
            group:'id'
        })
        console.log(student)

    } catch (error) {
        console.log('报错,', error)
    }
}

main()