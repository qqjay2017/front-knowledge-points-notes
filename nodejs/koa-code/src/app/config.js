const dotenv = require('dotenv')

dotenv.config()


module.exports = { APP_PORT , MYSQL_HOST , MYSQL_USER , MYSQL_PASSWORD , MYSQL_DATABASE , MYSQL_CONNECTION_LIMIT } = process.env;