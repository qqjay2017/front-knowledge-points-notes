import React from "react";
import {
    matchPath
} from "./matchPath";
import RouterContext from "./RouterContext";
export default class Route extends React.Component {
    // 类组件使用context的方法1,this.context就有值了
    static contextType = RouterContext;
    render() {
        // 类组件使用context的方法2,回调里面可以拿到context的value
        //     <RouterContext.Consumer>
        //     {
        //         ({history,location})=>{
        //             const {path,component:RouteComponent} = this.props;
        //             const match =( location.pathname  === path);
        //             const routeProps  = {history,location,match}
        //             if(match){
        //                 return <RouteComponent {...routeProps} />
        //             }else {
        //                 return null
        //             }
        //         }
        //     }
        // </RouterContext.Consumer>
        const {
            history,
            location
        } = this.context
        const {

            component: RouteComponent
        } = this.props;
        const match = matchPath(location.pathname,this.props)
        const routeProps = {
            history,
            location,
        }
        if (match) {
            routeProps.match = match;
            return <RouteComponent {
                ...routeProps
            }
            />
        } else {
            return null
        }

    }
}