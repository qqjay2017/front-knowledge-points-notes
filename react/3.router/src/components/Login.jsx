import React, { useEffect, useLayoutEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

export default   function Login()  {
  const history =  useHistory();
  function api(){
    return new Promise(resolve=>{
      setTimeout(() => {
        console.log('apiapiapiapiapiapiapiapiapi')
        resolve('apiapiapi')
      }, 3000);
    })
  }
  useEffect(()=>{
    async function  init(){
      await api()
    }
    init()
  },[])
  function login(){
    window.localStorage.setItem('login','login')
    const from = history.location.state.from || '/'
    history.push(from)
  }
  return (<div>请登录
      <button onClick={login}>login</button>

  </div>);
};
