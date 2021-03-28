const { Sequelize, DataTypes } = require('sequelize');



// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('employees', 'root', 'yourpassword', {
    host: 'localhost',
    dialect: 'mysql'
});

const Employee = sequelize.define('Employee', {
    emp_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    first_name: {
        type: DataTypes.CHAR
    },
    last_name: {
        type: DataTypes.CHAR
    },
    gender: {
        type: DataTypes.ENUM('M', 'F')
    },
    hire_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue:Sequelize.NOW
    },
}, {
    sequelize,
    tableName: 'employees',
    indexes:[{unique:true,fields:['emp_no']}],
    timestamps:false
})

sequelize.define('Salary', {
    emp_no: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    salary: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'salaries'
})



async function main() {
    try {
        await sequelize.authenticate()
        const employee = Employee.build({
            emp_no: 120001,
            birth_date: '1994-12-20',
            first_name: 'huang1',
            last_name: 'bo1',
            gender: 'M',
            
        })
       employee.save()
    } catch (error) {
        console.log('报错,', error)
    }
}

main()