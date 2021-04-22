const Router = require('koa-router');
const recordMiddleware = require("../middleware/record.middleware");
const {verifyUserHeader} = require("../middleware/auth.middleware");
const {create, update, index , destroy} = require('../controller/record.controller')


const router = new Router({prefix: '/record'})


//
router.post('/',  recordMiddleware.formatData, create)
router.delete('/:recordId',  destroy)
router.put('/:recordId',  recordMiddleware.formatData, update)
router.get('/',  index)


module.exports = router;