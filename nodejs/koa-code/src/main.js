const app = require('./app/app')

const { APP_PORT } = require('./app/config')


const PORT = APP_PORT || 3000;
app.listen(PORT, () => {
    console.log("  App is running at http://localhost:%d in %s mode",
     process.env.APP_PORT,process.env.NODE_ENV)
    console.log("  Press CTRL-C to stop\n");
})