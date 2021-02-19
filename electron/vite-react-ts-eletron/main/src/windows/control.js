const {BrowserWindow}=require('electron');
const path=require('path')
let win;
function create(){
    win=new BrowserWindow({
        width:800,
        height:800,
        webPreferences:{
            nodeIntegration:true
        }
    })
    // win.loadFile(path.resolve(__dirname,"../../../renderer/control.html"))
}

module.exports={create};