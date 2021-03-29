const { Op, Sequelize } = require('sequelize');
const initModels = require('./models/init-models')

async function main() {
    try {
        const sequelize = new Sequelize('employees', 'root', 'yourpassword', {
            host: 'localhost',
            dialect: 'mysql'
        });
        const models = initModels(sequelize)

        const employees = await models.employees.findAll({
            where: {
                emp_no: {
                    [Op.gte]:499999
                }
            },
            include:[
                {
                    model:models.salaries,
                    as:'salaries'
                },
                {
                    model:models.titles,
                    as:'titles'
                },
                {
                    model: models.departments,
                    as:'dept_no_departments'
                }
            ]
    

        })
       
        console.log(employees)



    } catch (error) {
        console.log('报错,', error)
    }
}

main()