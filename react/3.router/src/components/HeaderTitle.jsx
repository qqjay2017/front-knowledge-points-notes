import React from "react";
import { withRouter } from "react-router-dom";

class HeaderTitle extends React.Component {
  render() {
    const { title, history } = this.props;
    return <div   onClick={()=>history.push('/')}>{title}</div>;
  }
}

export default withRouter(HeaderTitle);
