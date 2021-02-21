import React, {useEffect, useState} from 'react'
import ReactDom from 'react-dom'
// const {ipcRenderer} = window.require('electron')
import { ipcRenderer , IpcRendererEvent } from 'electron'

const App = () => {
    const [localCode,setLocalCode]=useState('');//本身的控制码
    const [controlText,setControlText]=useState('');//控制码的文案
    const [remoteCode,setRemoteCode]=useState('');//控制的控制码
    const login = async () => {
        const code =await ipcRenderer.invoke('login')
        setLocalCode(code)
    }

    const handleControlState = (e:IpcRendererEvent,name:string,type:number)=>{
        let text='';
        if(type === 1){
            //控制别人
            text=`正在远程控制${name}`
        }else if(type === 2){
            //被别人控制
            text=`被${name}控制`
        }
        setControlText(text)//当前页面的文本
    }

    useEffect(()=>{
        // 渲染现成等待推送
        ipcRenderer.on('control-state-change',handleControlState)
        return ()=>{
            ipcRenderer.removeListener('control-state-change',handleControlState)
        }
    },[])

    const startControl = (remoteCode:string)=>{
        ipcRenderer.send('control',remoteCode)
    }

    return <div>
        <div>获取的控制码:{localCode}</div>
        <input type="text" value={remoteCode} onChange={e=>setRemoteCode(e.target.value)}/>
        <button onClick={()=>login()}>生成一个控制码(渲染线程请求主线程)</button>
        <button onClick={()=>startControl(remoteCode)}>申请控制这个控制码(渲染进程发起请求)</button>
    </div>
}
ReactDom.render(<App></App>, document.getElementById('root'))