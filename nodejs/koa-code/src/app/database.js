const mysql = require('mysql2');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_CONNECTION_LIMIT } = require('./config')

const pool = mysql.createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,

    connectionLimit: MYSQL_CONNECTION_LIMIT,
    waitForConnections: true,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    connection.connect((err) => {
        if (err) {
            console.log('数据库连接失败', JSON.stringify({ MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE }))
        }else {
            console.log('数据库连接成功')
        }
    })
})

module.exports = pool.promise()