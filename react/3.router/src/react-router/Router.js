import React from "react";

import RouterContext from "./RouterContext";

class Router extends React.Component {
  constructor(props) {
    super(props);

    console.log(props.history)
    this.state = {
      location: props.history.location,
    };

    this.unListen = props.history.listen(( location) => {
      // console.log(location,'locationlocation')
      this.setState({
        location,
      });
    });
  }

  componentWillUnmount(){
      this.unListen && this.unListen()
  }
  render() {
    let value = {
      location: this.state.location,
      history:this.props.history
    };
    // console.log(this.props.children);
    return (
      <RouterContext.Provider value={value}>
          {this.props.children}
      </RouterContext.Provider>
    );
  }
}

export default Router;
