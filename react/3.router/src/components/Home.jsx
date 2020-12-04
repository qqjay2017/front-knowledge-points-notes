import { useState } from "react";
import HomeNav from "./HomeNav";

import {   Prompt } from 'react-router-dom'

function Home(props) {
  const [number, setNumer] = useState(1);
  function handleClick() {
    console.log("handleClick");
  }
  return (
    <div>
      <h1>Home</h1>
      <HomeNav handles={{ click: handleClick }} />
      <button onClick={() => setNumer(number + 1)}>{number}</button>
      <Prompt
            when={true} 
            message="Are you sure you want to leave?"
/>

    </div>
  );
}

export default Home;
