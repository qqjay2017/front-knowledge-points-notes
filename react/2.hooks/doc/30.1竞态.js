import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

/**
 * 竞态
 * 先发的请求后回来了
 * 
 */

const api = {
  async fetchArticle(id){
    return new Promise(resolve=>{
      setTimeout(() => {
          resolve({
            id,title:`title_${id}`
          })
      }, 100*id);
    })
  }
}

function Article({id}){
  let [article,setArticle] = useState({});
  useEffect(()=>{
    let didCancel = false;  //定义一个变量,记录请求是否已经取消
    async function fetchData(){
      let article =   await api.fetchArticle(id);
      if(!didCancel){ //如果没取消,我就赋值
        setArticle(article)
      }
    
    }
    fetchData()
    return ()=>{  // 销毁函数,多次连续请求接口,只在最后一次赋值
      didCancel = true;
    }
  },[id])

  return (<div>
    <p>{article.title}</p>
  </div>)    
}


function App() {
  const [id, setID] = useState(1);
  return (
    <div>
      <p>id:{id}</p>
      <Article  id={id} />
      <button onClick={()=>setID(id+1)}>改变id</button>
    </div>
  )
}

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}
render();
