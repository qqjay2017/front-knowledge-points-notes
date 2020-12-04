import React from "react";
import ReactDOM from "react-dom";

const root = document.getElementById("root");

/**
 * Fragment是什么
 * 接收一个组件,返回一个新的组件
 */


 let element = <React.Fragment>
<h1>
 hello
</h1><h1>
 hello
</h1><h1>
 hello
</h1>

 </React.Fragment>

// console.log(element.type = 'h2')

ReactDOM.render(element, root);
