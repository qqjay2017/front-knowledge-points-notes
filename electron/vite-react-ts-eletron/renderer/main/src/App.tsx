import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

// import { ipcRenderer, IpcRendererEvent } from "electron";

function App() {
  const [count, setCount] = useState(0);
  const [remoteCode, setRemoteCode] = useState(""); //控制的控制码
  const [localCode, setLocalCode] = useState(""); //本身的控制码
  const [controlText, setControlText] = useState(""); //控制码的文案


  useEffect(() => {
    // login();
    // ipcRenderer.on("control-state-change", handleControlState);
    // return () => {
    //   ipcRenderer.removeListener("control-state-change", handleControlState);
    // };
  });

  return (
    <div className="App">
      {controlText === "" ? (
        <>
          <div>你的控制码{localCode}</div>
          {/* <input
            type="text"
            value={remoteCode}
            onChange={(e) => setRemoteCode(e.target.value)}
          />
          <button onClick={() => startControl(remoteCode)}>确认</button> */}
        </>
      ) : (
        <div>{controlText}</div>
      )}
    </div>
  );
}

export default App;
