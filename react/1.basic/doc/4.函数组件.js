import React from "./react";
import ReactDOM from "./react-dom";

// const element = React.createElement('h1',null,'Hello')

function Welcome(props){
  return React.createElement(
    "div",
    {
      className: props.name,
      style: {
        color: "red",
        fontSize:'30px'
      },
    },
   React.createElement("h1", null, "hello"),
    "world"
  )
}



const element = React.createElement(
  Welcome,
  {
    name: "welcome",
    style:{
      fontSize:'30px'
    }
  },
 
);




// console.log(JSON.stringify(element));

/**
jsx转化为对象

{"type":"h1",
"key":null,"ref":null,
"props":{"children":"Hello"},
"_owner":null,
"_store":{}
}
 */

/**
{
  type: "div",
  props: {
    className: "title",
    style: { color: "red" },
    children: [
      {
        type: "h1",
        props: { children: "hello" },
      },
      "world",
    ],
  },
};
 */


 ReactDOM.render(element, document.getElementById("root"));
