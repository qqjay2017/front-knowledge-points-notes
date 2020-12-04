import {
    // createDom, 
    compareTwoVDom
} from './react-dom'

// 更新队列 对象  = 单例模式
export let updateQueue = {
    // updaters: [],
    updaters: new Set(), // 优化点,如果是一样就会覆盖
    isBatchingUpdate: false, //是否批量更新,默认不批量更新
    add(updater) {
        this.updaters.add(updater);

    },
    batchUpdate() {
        this.updaters.forEach(updater => updater.updateComponent());
        this.isBatchingUpdate = false;
        // 循环完清空
        this.updaters.length = 0;
    }

}

// 更新器  非单例模式
class Updater {
    constructor(componentInstance) {
        this.componentInstance = componentInstance; // 实例
        this.pendingStates = [] // 等待更新的队列
    }

    addState = (partialState) => {
        this.pendingStates.push(partialState)
        this.emitUpdate() // 发射更新
    }
    emitUpdate = (nextProps) => {
        this.nextProps = nextProps;
        this.nextProps || !updateQueue.isBatchingUpdate ?
            this.updateComponent() :
            updateQueue.add(this) // 是批量更新

        ; // 同步更新,直接更新
    }

    updateComponent = () => { // 开始真正用pendingStates更新组件
        const {
            componentInstance,
            pendingStates,
            nextProps
        } = this;
        if (nextProps || pendingStates.length > 0) {
            // 拿到新状态
            const state = this.getState();
         
            componentInstance.state = state;
            // // 强制更新视图
            // componentInstance.forceUpdate()

            // 无论视图更不更新,都要合并状态
            shouldUpdate(componentInstance,nextProps, state);
        }
    }
    // 合并状态
    getState = () => {
        const {
            componentInstance,
            pendingStates,

            nextProps
        } = this;
        // console.log(this)
        let {
            state
        } = componentInstance;

        this.pendingStates.forEach(pendingState => {

            if (typeof pendingState == 'function') { //是函数的话,老状态传给他
                pendingState = pendingState.call(componentInstance, state);
            }
            // 不是函数的话,直接覆盖
            state = {
                ...state,
                ...pendingState,
                ...nextProps
            }
        })
        pendingStates.length = 0;
        return state;
    }
}


function shouldUpdate(componentInstance,nextProps, nextState) {
    if (componentInstance.shouldComponentUpdate &&
        !componentInstance.shouldComponentUpdate(componentInstance.props, nextState)) {
        return;
    }
    if(nextProps){
        componentInstance.props = nextProps;
    }
    // console.log(componentInstance)
    componentInstance.forceUpdate();



}

class Component {
    // render的时候判断是不是类组件
    static isReactComponent = true;
    constructor(props) {
        this.props = props;
        this.state = {};
        this.updater = new Updater(this) // 每个组件都会配一个更新器
        this.oldVDom = {};
        this.dom = null;

    }

    setState = (partialState) => {
        // debugger
        this.updater.addState(partialState); //setState调用时候,把参数传进更新去 
        // 如何更新视图: Updater调自身的updateComponent,进行state合并值
        // 然后updateComponent方法调用组件的forceUpdate
    }
    // 强制更新
    forceUpdate = () => {
        if (this.componentWillUpdate) {
            this.componentWillUpdate()
        }
        // 开始更新组件

        if(this.ownVDom.type.getDerivedStateFromProps){
            let newState = this.ownVDom.type.getDerivedStateFromProps(this.props,this.state);
            if(newState){
                this.state = newState
            }
        }

        // 得到新的虚拟dom
        let newVDom = this.render();
       
        let currentVDOM = compareTwoVDom(this.oldVDom.dom.parentNode, this.oldVDom, newVDom);
        this.oldVDom = currentVDOM;
        if (this.componentDidUpdate) {
            this.componentDidUpdate()
        }

    }
}

// function updateClassComponent(instance, renderVDom) {
//     let oldDom = instance.dom;

//     let newDom = createDom(renderVDom);

//     oldDom.parentNode.replaceChild(newDom, oldDom);
//     // 完成更新的生命周期

//     instance.dom = newDom;

// }

export class PureComponent extends Component {
   
    shouldComponentUpdate(nextProps, nextState) {
      // 如果return false,render方法就不会执行
      const oldStateArr = Object.keys(this.state);
      const newStateArr = Object.keys(nextState);
      if (oldStateArr.length !== newStateArr.length) {
        return true;
      }
      for (let oldKey in this.state) {
        // 一个个对比
        if (this.state[oldKey] !== nextState[oldKey]) {
          return true;
        }
      }
      return false;
    }
  
  }

export default Component;