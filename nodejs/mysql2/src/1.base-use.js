const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'yourpassword',
    database: 'employees'
});

const statement = `

SELECT
	students.\`name\` AS student_name,
	students.\`age\` AS student_age,
	courses.\`name\` AS course_name,
	courses.\`id\` AS course_id,
	courses.\`price\` AS course_price 
FROM
	\`student_course\`
	INNER JOIN students ON students.id = student_course.student_id
	INNER JOIN courses ON courses.id = student_course.course_id;
`


// 1.simple query
// connection.query(statement,
//     function (err, results, fields) {
//         console.log(err)
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//         connection.end()
//     }
// );




// 监听错误
connection.on('error', () => {

})





// 2.预处理语句(准备语句)

// https://github.com/sidorares/node-mysql2/blob/master/documentation/Prepared-Statements.md

// 2.1.提高性能 2.2.防止sql注入


// connection.execute('SELECT * FROM employees.salaries WHERE salaries.salary > ?;', [50000], (err, rows) => {
//     console.log(rows)
// })





