import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import store from "./store";

import Count from "./component/Count";
import Count2 from "./component/Count2";
import Count3 from "./component/Count3";

function App() {
  return <Count3 />;
}



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
