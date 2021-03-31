const crypto = require('crypto')

const md5PasswordSign = (password) => {
    const md5 = crypto.createHash('md5')
    const result = md5.update(password).digest('hex') // 16进制
    return result

}


module.exports = {
    md5PasswordSign
}