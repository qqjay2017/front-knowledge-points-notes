import React from 'react'

import ReduxContext from './ReduxContext'

/**
 * Provider非常简单,拿到store,给ReduxContext.Provider 
 */

class Provider extends React.Component {
    // this.store
    render(){
        // console.log(this.props.children)
        const value ={store: this.props.store}
        return (<ReduxContext.Provider  value={value}>
                   {this.props.children}
            </ReduxContext.Provider>)
    }
}


export default Provider;