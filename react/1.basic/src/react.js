import Component,{PureComponent}  from './Component'

export let reactFragment = 'react.fragment'

/**
 * 
 * @param {String | Function} type 字符串或者组件(函数)
 * @param {*} config 
 * @param {*} children 
 */

function createElement(type, config, children) {

    let ref;
    if (config) {
        delete config._owner;
        delete config._store;
        ref = config.ref;
        delete config.ref;
    }
    const props = {
        ...config
    };
    if (arguments.length > 3) {
        children = Array.prototype.slice.call(arguments, 2)
    }
    props.children = children;
    return {
        type,
        props,
        ref
    }
}


function createRef() {
    return {
        current: null
    }
}

function createContext(){
    // 提供者
    function Provider({value,children}){
        Provider.value = value;
        return children
    }
    // 消费者
    function Consumer({children}){  // props.children
        return children(Provider.value)
    }
    return {
        Provider,
        Consumer,
    }
}

function cloneElement(element,props,children) {
    if (arguments.length > 3) {
        children = Array.prototype.slice.call(arguments, 2)
    }
    props.children = children;
    return {
        ...element,
        props,
        
    }
}



const React = {
    createElement,
    cloneElement,
    Component,
    PureComponent,
    createRef,
    createContext,
    Fragment:reactFragment  // Fragment的类型是Symbol,
}

export default React;