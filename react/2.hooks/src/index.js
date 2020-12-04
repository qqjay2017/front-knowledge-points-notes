import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

/**
 * 自定义hooks,
 * 1.调其他hooks
 * 2.use开头(必须,否则报错)
 *
 */

const api = {
  async fetchArticle(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          title: `title_${id}`,
        });
      }, 100 * id);
    });
  },
};

function useRequest(artId) {
  let [art, setArt] = useState({});

  async function fetchData() {
    setArt({});
    const newArt = await api.fetchArticle(artId);
    console.log(newArt);
    setArt(newArt);
  }
  useEffect(()=>{
    fetchData()
  }, [artId]);
  return art;
}

function App() {
  let [curId, setCurId] = useState(1);
  let { id, title } = useRequest(curId);
  if (!title) {
    return <div>加载中...</div>;
  }
  return (
    <div>
      curId:{curId}
      id:{id},,,
      <h1>title:{title}</h1>
      <button onClick={() => setCurId(curId + 1)}>加载下一条</button>
    </div>
  );
}

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}
render();
