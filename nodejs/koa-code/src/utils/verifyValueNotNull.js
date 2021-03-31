const { HttpStatus } = require('@nestjs/common');
const ErrorType = require('../constants/error-type')

const verifyValueNotNull = (ctx, obj) => {
    if (typeof obj == 'object' && obj != null) {
        const nullKey = Object.keys(obj).find(key => {
            const value = obj[key]
            if (value == null || value == undefined || value == '') {
                return true
            } else {
                return false
            }
        })
        if (nullKey) {
            return ctx.app.emit(ErrorType.HTTP_ERROR,
                {
                    status: HttpStatus.PAYMENT_REQUIRED,
                    message: ` ${nullKey} 不能为空~`
                },
                ctx)
        }

    } else {
        return
    }


}

module.exports = verifyValueNotNull