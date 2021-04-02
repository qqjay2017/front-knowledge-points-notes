import app from "./app";
import config from "./config/index";

const APP_PORT = config.APP_PORT || 7001;

app.listen(config.APP_PORT || 7001,()=>{
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        APP_PORT,
        config.APP_ENV
    );
    console.log("  Press CTRL-C to stop\n");
});
