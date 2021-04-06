const Router = require('koa-router');
const recordMiddleware = require("../middleware/record.middleware");
const {verifyUserHeader} = require("../middleware/auth.middleware");
const {create, update, index , destroy} = require('../controller/record.controller')


const router = new Router({prefix: '/record'})


//
router.post('/', verifyUserHeader, recordMiddleware.formatData, create)
router.delete('/:recordId', verifyUserHeader, destroy)
router.put('/:recordId', verifyUserHeader, recordMiddleware.formatData, update)
router.get('/', verifyUserHeader, index)


module.exports = router;