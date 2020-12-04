import React from "react";
import ReactDOM from "react-dom";

const root = document.getElementById("root");

const ThemeContent = React.createContext();

//ThemeContent =  {Provider,Consumer}     函数组件
// console.log(ThemeContent)


class Title extends React.Component {
  render(){
  
    return (<ThemeContent.Consumer>
      {
        (value)=>(
          <div
          style={{margin:'10px',border:`5px solid ${value.color}`,
          padding:'10px'
          }}
          >Title
          <button onClick={()=>value.changeColor('green')}>改变颜色green</button>
          <button onClick={()=>value.changeColor('yellow')}>改变颜色yellow</button>
          </div>
        )
         
        
      }
    </ThemeContent.Consumer>)
  }
}

class Header extends React.Component {
  render(){
  
    return (<ThemeContent.Consumer>
      {
        (value)=>(
          <div
          style={{margin:'10px',border:`5px solid ${value.color}`,
          padding:'10px'
          }}
          >header
          <Title />
          </div>
        )
         
        
      }
    </ThemeContent.Consumer>)
  }
}


class Page extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      color:'red'
    }
  }
  changeColor = (color)=>{
    this.setState({
      color
    })
  }
  render(){
    let value = {
      color:this.state.color,
      changeColor:this.changeColor
    }
    let style ={margin:'10px',border:`5px solid ${this.state.color}`,
  padding:'10px'
  }
    return (
      <ThemeContent.Provider value={value}>
        <div style={style}>
              <Header />
        </div>
      </ThemeContent.Provider>
    )
  }
}

let element = <Page />

ReactDOM.render(element, root);
