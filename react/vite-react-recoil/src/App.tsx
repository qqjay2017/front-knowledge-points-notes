import  { useState } from "react";
import { RecoilRoot } from "recoil";
import VisualEditor from "./visualEditor/index";
import './App.scss'

function App() {
  return (
    <RecoilRoot>
      <div className="App">
          <VisualEditor />
      </div>
    </RecoilRoot>
  );
}


export default App;
