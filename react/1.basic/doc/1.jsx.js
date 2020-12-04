import React from "react";
import ReactDOM from "react-dom";

// const element = React.createElement('h1',null,'Hello')

const element = React.createElement(
  "div",
  {
    className: "title",
    style: {
      color: "red",
    },
  },
  /*#__PURE__*/ React.createElement("h1", null, "hello"),
  "world"
);

console.log(JSON.stringify(element));

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
