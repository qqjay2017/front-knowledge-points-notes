/**
 * 
 * @param {Object} element 虚拟dom 
 * @param {HTMLElement}  container root容器 
 */

import {
    addEvent
} from "./event";

function render(element, container) {

    //  debugger

    let dom = createDom(element);
    //  console.log(dom)
    container.appendChild(dom)
}

/**
 * 虚拟dom变成真实dom
 * @param {Object} element 虚拟dom
 */

export function createDom(element) {


    if (typeof element == 'string' || typeof element == 'number') {

        return document.createTextNode(element)
    }

    if (!element || !element.type) {
        return ''
    }

    let {
        type,
        props,
        ref
    } = element;
    
    let dom;
    // 处理函数组件
    if (typeof type === 'function') {

        if (type.isReactComponent) { //类组件
            
            return updateClassComponent(element)
        } else {
            return updateFunctionComponent(element);
        }


    } else { // 原生dom
        
        dom = document.createElement(type);

        element.dom =dom;
      
    }

    updateProps(dom, {}, props)

    element.dom = dom;

    let children = props.children;


    // 处理数组
    if (Array.isArray(children)) {
        // console.log(children,'children')
        children.forEach(child => {
            // dom.appendChild(createDom(child))

            render(child, dom)
        })
        // 处理字符串和数字
    } else if (typeof children == 'string' || typeof children == 'number') {
        dom.textContent = children;
        // 处理对象
    } else if (typeof children == 'object' && children.type) {
        render(children, dom)
        // 意外情况,toString
    } else {
        dom.textContent = children ? children.toString() : ''
    }

    if (ref) {
        ref.current = dom;
    }

    

    return dom

}

/**
 * 处理属性
 * @param {HTMLElement} dom createElement出来的真实dom
 * @param {Object} props 属性
 */

function updateProps(dom, oldProps, props) {
    for (let key in props) {
        if (key === 'children') continue;
        if (key === 'style') {
            let styleObj = props[key];
            for (let styleKey in styleObj) {
                dom.style[styleKey] = styleObj[styleKey];
            }
        } else if (key.startsWith('on')) {

            // dom.addEventListener(key.slice(2).toLowerCase(), props[key])
            // dom[key.toLocaleLowerCase()] = props[key];

            // 更新11 合成事件处理  委托给document  (17版本委托给root)

            addEvent(dom, key.toLowerCase(), props[key])
        } else {
            dom[key] = props[key];
        }

    }
}
/**
 * 处理函数组件
 * @param {Object} element 函数组件
 */
function updateFunctionComponent(element) {
    let {
        type,
        props
    } = element;
    let renderVDom = type(props)

    const dom =  createDom(renderVDom)
    renderVDom.dom = dom;
    element.renderVDom = renderVDom;
    return dom

}

/**
 * 处理类组件
 * @param {Object} element 虚拟dom Count  {type:class Count}
 */

function updateClassComponent(element) {
    // debugger
    let {
        type,
        props
    } = element;
    let component = new type(props);
    // debugger

    element.classInstance = component;
    component.ownVDom = element;
    // render前执行componentWillMount生命周期函数
    if (component.componentWillMount) {
        component.componentWillMount()
    }
    // 类组件实例,挂载在虚拟dom上

    // console.log(element,'element')


    // 调用render方法,得到虚拟dom
    let renderVDom = component.render();

    let dom = createDom(renderVDom);

    element.dom = renderVDom.dom = dom;
    // console.log(element,'element')
    // console.log(element,'updateClassComponent')
    
    component.oldVDom = renderVDom;
    component.dom = dom;

    if (component.componentDidMount) {
        component.componentDidMount()
    }

    return dom;
}


/**
 * dom-diff过程
 * 将老的虚拟dom和新的虚拟dom对比
 * @param {} parentNode     父节点  刚开始是root
 * @param {Object} oldVDom      旧的虚拟dom
 * @param {Object} newVDom      新的虚拟dom
 */
export function compareTwoVDom(parentNode, oldVDom, newVDom) {
    // console.log(oldVDom,'compareTwoVDom')
   
    if (!oldVDom  && !newVDom ) { // 新老都没有
        return null;
    } else if (oldVDom && !newVDom) { // 有老的,新的没有,移除老的
        let currentDom = oldVDom.dom; //老的真实dom

        currentDom.parentNode.removeChild(currentDom); // 移除老的
        if (oldVDom.classInstance && oldVDom.classInstance.componentWillUnmount) {
            oldVDom.classInstance.componentWillUnmount()
        }
        return null;
    } else if (!oldVDom&& newVDom) { // 老的没有,新的有,创一个新的,挂父节点上面
        let newDOM = createDom(newVDom);
        // debugger;
        newVDom.dom = newDOM;
        // TODO 不一定用appendChild
        parentNode.appendChild(newDOM);
        return newVDom;

    } else if(oldVDom  && newVDom && (newVDom.type !== oldVDom.type) ){
        // 新老都有,但是type不一样,也需要重新创建
        let oldDom = oldVDom.dom;
        let newDOM = createDom(newVDom);
        oldDom.parentNode.replaceChild(newDOM,oldDom);
        if (oldVDom.classInstance && oldVDom.classInstance.componentWillUnmount) {
            oldVDom.classInstance.componentWillUnmount()
        }
        return newVDom;
    }else {
        // 新老节点都有值
        // debugger;
        // console.log(oldVDom,'oldVDomoldVDomoldVDom')
        // debugger;
       
        updateElement(oldVDom, newVDom);
        return newVDom
    }
}
/**
 * 如果走到这里,说明要复用老的dom节点
 * DOM-DIFF的时候,REact为了性能优化,有一些假设条件
 * 1.不考虑跨层移动
 * 
 * 进入深度比较
 * @param {*} oldVDom 旧的虚拟dom
 * @param {*} newVDom 新的虚拟dom
 */
function updateElement(oldVDom, newVDom) {

    // console.log(oldVDom, newVDom)
  
    
    if (typeof oldVDom.type === 'string') { // 原生的dom类型  div
        let currentDOM = oldVDom.dom; //获取到老的真实dom

        newVDom.dom = currentDOM// 同步到新的虚拟dom
        newVDom.classInstance = oldVDom.classInstance
       
        updateProps(currentDOM, oldVDom.props, newVDom.props);
       
        updateChildren(currentDOM, oldVDom.props.children, newVDom.props.children)
    } else if (typeof oldVDom.type == 'function') {
        newVDom.dom =  oldVDom.dom// 同步到新的虚拟dom
        newVDom.classInstance = oldVDom.classInstance
       if(oldVDom.type.isReactComponent){  //类组件
            // 这里只考虑class组件
        // console.log(oldVDom,'updateElement')
        // classInstance续到新的vDom
       
        updateClassInstance(oldVDom, newVDom)
       }else {  //函数组件
        updateFunctionInstance(oldVDom, newVDom)
       }
    }

}
/**
 * 
 * @param {*} parentDOM 父节点的真实dom
 * @param {*} oldVChildren 老的虚拟dom儿子们
 * @param {*} newVChildren 新的虚拟dom儿子们
 */

function updateChildren(parentDOM, oldVChildren, newVChildren) {
       
    // debugger
    // 新老都是字符串类型
    if ((typeof oldVChildren === 'string' ||
            typeof oldVChildren === 'number') &&
        (typeof newVChildren === 'string' ||
            typeof newVChildren === 'number'
        )
    ) {
        // console.log(parentDOM)
        if (oldVChildren !== newVChildren) {

            parentDOM && (parentDOM.innerText = newVChildren);
        }
        return
    }
    oldVChildren = Array.isArray(oldVChildren) ? oldVChildren:[oldVChildren]
    newVChildren = Array.isArray(newVChildren) ?newVChildren:[newVChildren]

    // 数组
    let maxLength = Math.max(oldVChildren.length, newVChildren.length);

    for (let i = 0; i < maxLength ; i++) {
        // 递归出去
        
        compareTwoVDom(parentDOM, oldVChildren[i], newVChildren[i])
    }
}

function updateClassInstance(oldVDom, newVDom) {
    
    let classInstance = oldVDom.classInstance;
    if (classInstance && classInstance.componentWillReceiveProps) {
        classInstance.componentWillReceiveProps()
    }
   
    classInstance && classInstance.updater &&  classInstance.updater.emitUpdate(newVDom.props)
}

function updateFunctionInstance(oldVDom, newVDom){
    console.log(newVDom)
    const parentDOM = oldVDom.renderVDom.dom
    let {type,props} = newVDom;
    let newRenderVDom = type(props) // 新的虚拟dom
    newVDom.renderVDom = newRenderVDom
    compareTwoVDom(parentDOM,oldVDom.renderVDom,newRenderVDom)
}

const ReactDOM = {
    render
}


export default ReactDOM;