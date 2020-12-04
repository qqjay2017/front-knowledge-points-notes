import React, { useState } from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import store from "./store";

import Count1 from "./components/Count1";
import Count2 from "./components/Count2";
function App() {
  const [number, setNumber] = useState(1);
  return (
    <div>
      <Count1 />
      <h1>----------------------</h1>
      <Count2 />
      <h1>----------------------</h1>
      <h1>{number}</h1>
      <button onClick={() => setNumber(number + 1)}>+</button>
    </div>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
