import React from 'react'

class HomeNav extends React.Component {


    shouldComponentUpdate(nextPoprs,nextState){
            console.log(nextPoprs,'nextPoprs')
            console.log(this.props,'this.props')
            console.log(nextPoprs === this.props,'nextPoprs === this.props')
            return true
    }
    handleClick = ()=>{}
   
   render(){
      let handles = { click: this.handleClick }
    return <button handles={handles}>push</button>
   }
}

export default HomeNav
