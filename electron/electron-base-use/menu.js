const { Menu, BrowserWindow } = require('electron')


/**
 * `Menu`属于是 `主线程下` 的模块，所以只能在主线程中使用。所以在主线程中引用下，main.js文件
 */
var template = [//模板
    {
        label:'四季',
        submenu:[
            {label:"春天",
            click:()=>{
                win = new BrowserWindow({
                    width:500,
                    height:500,
                    webPreferences:{ nodeIntegration:true}
                })
                win.loadFile('red.html')
                win.on('close',()=>{
                    win = null
                })
            }
        },
            {label:"夏天"},
            {label:"秋天"},
            {label:'冬天'}
        ]

    },
    {
        label:'两天',
        submenu:[
            {label:'白天'},
            {label:'黑天'}
        ]
    }
]

var menu = Menu.buildFromTemplate(template)
console.log(menu)
Menu.setApplicationMenu(menu)

