import {BrowserWindow} from 'electron'
import {resolve} from 'path'
let win;
export function createControlWindow() {
    win=new BrowserWindow({
        width:800,
        height:800,
        webPreferences:{
            nodeIntegration:true
        }
    })
    win.loadFile(resolve(__dirname,'../render/control/index.html'))
}