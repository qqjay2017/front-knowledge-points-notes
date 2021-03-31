const fs = require('fs')



const useRoutes = (app) => {
   const files = fs.readdirSync(__dirname).forEach(file=>{
      if(file == 'index.js'){
         return 
      }else {
         const router = require(`./${file}`)
         app.use(router.routes())
         app.use(router.allowedMethods())
      }
   })

   console.log('路由注册成功!')
}


module.exports = useRoutes;