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
            attributes:[
                [sequelize.fn('COUNT', sequelize.col('dept_no_departments')), 'count'],
            ],
            where: {
                emp_no: 10010
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
                    as:'dept_no_departments',
                 
                }
            ]
    

        })
       
        console.log(employees[0].dataValues)



    } catch (error) {
        console.log('报错,', error)
    }
}

main()