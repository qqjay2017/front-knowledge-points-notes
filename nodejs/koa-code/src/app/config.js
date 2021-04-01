const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

dotenv.config()


const PRIVATE_KEY = fs.readFileSync(path.join(process.cwd(), 'keys', 'private.key'));
const PUBLIC_KEY = fs.readFileSync(path.join(process.cwd(), 'keys', 'public.key'));


const {
    APP_PORT, 
    MYSQL_HOST,
    MYSQL_USER, 
    MYSQL_PASSWORD,
     MYSQL_DATABASE,
    MYSQL_CONNECTION_LIMIT,
 
} = process.env

module.exports = {
    APP_PORT, 
    MYSQL_HOST,
    MYSQL_USER, 
    MYSQL_PASSWORD, 
    MYSQL_DATABASE,
    MYSQL_CONNECTION_LIMIT,
    PRIVATE_KEY,
    PUBLIC_KEY
} ;