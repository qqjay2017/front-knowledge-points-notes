const {
    app,
    BrowserWindow,
    BrowserView
} = require('electron');
let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({ // 创建和控制浏览器窗口
        width: 600, // 窗口宽度
        height: 600, // 窗口高度
        webPreferences: { // 网页功能设置
            nodeIntegration: true, // 是否在node工作器中启用工作集成默认false
            enableRemoteModule: true, // 是否启用remote模块默认false,如果要使用remote,要手动打开
        }
    });
    mainWindow.webContents.openDevTools() //打开控制台
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'; //消除控制台上报警文字

    mainWindow.loadFile('index.html'); // 加载页面
    //主窗口设置viewWindw
    // const viewWindow = new BrowserView()
    // mainWindow.setBrowserView(viewWindow)
    // viewWindow.setBounds({
    //     x: 0,
    //     y: 150,
    //     width: 600,
    //     height: 600
    // })

    // viewWindow.webContents.loadURL('https://www.baidu.com')
    mainWindow.on('close', () => { // 监听窗口关闭
        mainWindow = null //销毁mainWindow
    })

})