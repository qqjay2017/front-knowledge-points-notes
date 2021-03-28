// // 3. 连接池


const mysql = require('mysql2');

/**
 * The pool does not create all connections upfront but creates them on demand until the connection limit is reached.

You can use the pool in the same way as connections (using pool.query() and pool.execute()):

池不会预先创建所有连接，而是根据需要创建它们，直到达到连接限制。 您可以使用与连接相同的方式来使用池（使用pool.query（）和pool.execute（））：
 */

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:'yourpassword',
    database: 'employees',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });


  pool.execute('SELECT * FROM employees.salaries WHERE salaries.salary > ?;', [50000], (err, rows) => {
    console.log(rows)
})