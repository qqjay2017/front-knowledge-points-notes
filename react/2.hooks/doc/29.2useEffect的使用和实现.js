import React from "react";
import ReactDOM from "react-dom";

let hookStates = [];
let hookIndex = 0;

function useReducer(reducer, initializerArg, initializer) {
  // 初始化赋值操作
  hookStates[hookIndex] =
    hookStates[hookIndex] ||
    (initializer
      ? initializer(initializerArg)
      : initializerArg);
    
  let currentIndex = hookIndex; //缓存闭包的值
  function dispatch(action) {
    hookStates[currentIndex] = reducer
      ? reducer(hookStates[currentIndex], action)
      : (typeof action === 'function'
        ? action(hookStates[currentIndex]) // 支持函数
        : action
      );
    // console.log(hookStates)
    render();
  }

  return [hookStates[hookIndex++], dispatch];
}

// useState是简化版的useReducer,是语法糖
// 永远不要在if或者循环中使用hooks  索引就乱了

function useState(initState) {
  return useReducer(null, initState);
}

function useEffect(effect, newDeps ) {
  if (hookStates[hookIndex]) {
    // 上一次的
    let {destroy,deps} = hookStates[hookIndex];
    let same;// 处理没传deps的情况
    same =  newDeps? newDeps.every((item, index) => item === deps[index]):false
    // 如果完全一样,就不执行
    if (same) {
      hookIndex++;
    } else {
      destroy && destroy(); // 执行上一次的销毁函数
      let state = {deps: newDeps };
      hookStates[hookIndex++] = state;
      setTimeout(()=>{
        let destroy = effect();
        state.destroy = destroy;
      });
    }
  } else {
    // 第一次进来,没有值,就赋值
    let state = {deps: newDeps };
    hookStates[hookIndex++] = state;
    setTimeout(() => {
      let destroy = effect();
      state.destroy = destroy;
    }); // 用宏任务实现,保证在页面渲染完成后执行
  }
}

function App() {
  const [count, setCount] = useState(1);

  // useEffect,=>基本使用:第一个参数是函数,写副作用,第二个参数写依赖列表
  // useEffect(()=>{
  //   document.title = `你点击了${count}次`
  // },[count])

  // useEffect(()=>{
  //    //这么写会触发多个定时器,解决:依赖项传入空数组
  //   setInterval(() => {

  //   setCount(count=>count + 1)
  //   }, 1000);
  // })

  // useEffect(() => {
  //   setInterval(() => {
  //     setCount((count) => count + 1);
  //   }, 1000);
  // }, []); //依赖项传入空数组,空数组永远都一样,函数永远只会执行一次,定时器也永远只有一个

  useEffect(() => {
    let timer = setInterval(() => {
      setCount(count => count + 1);
    }, 1000);

    return () => {
      console.log("清除定时器");
      // return一个函数将会在组件销毁时调用这个函数,didUnMounted,清除副作用
      // 执行顺序: setInterval  => render  => clearInterval
      clearInterval(timer);
    };
  }, [count]); // 如果依赖里面有count,就要清定时器

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

function render() {
  hookIndex = 0;
  ReactDOM.render(<App />, document.getElementById("root"));
}
render();
