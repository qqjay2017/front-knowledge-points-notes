import React, { useState } from "react";

import { RecoilRoot } from "recoil";

import VisualEditor from "./visualEditor/index";



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
