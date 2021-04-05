
// const createError = require('http-errors')

/**
 * 处理在接口中可能遇到的错误
 * @param {*} error 
 * @param {*} ctx 
 */

function httpErrorHandle(error, ctx) {
        const message = error.message || error.error || '未知异常'
        const status = error.status || 500
        // ctx.throw(createError(status,message))
        throw new Error(message,status)

}

module.exports = httpErrorHandle