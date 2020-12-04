import React from "react";
import { Router } from "react-router";
import { connect, ReactReduxContext } from "react-redux";

import {onLocationChanged} from './actions'

class ConnectedRouter extends React.PureComponent {
  static contextType = ReactReduxContext;
  constructor(props) {
    super(props);
    this.props = props;
    const {history,onLocationChanged} = props;
    this.unlisten = history.listen(onLocationChanged)
  }
  componentWillUnmount(){
    this.unlisten()
  }
  render() {
    const { history, children } = this.props;
    return <Router history={history}>{children}</Router>;
  }
}
const mapDispatchToProps = dispatch => ({
    onLocationChanged: (location, action) => dispatch(onLocationChanged(location, action))
})

export default connect(
    null,
    mapDispatchToProps
)(ConnectedRouter);
