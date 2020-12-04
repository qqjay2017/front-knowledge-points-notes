import {
    createStore
} from 'redux'

const counter = document.getElementById('counter')
const add = document.getElementById('add')
const minus = document.getElementById('minus')

function reducer(state = {
    number: 0
}, action) {

    switch (action.type) {
        case 'ADD':
            state.number = state.number + 1;

            return state

        case 'MINUS':
            state.number = state.number - 1
            return state
        default:
            return state
    }

}

/**
 * store    ,第一个参数是reducer
 * 1.获取仓库中的状态  store.getState() ,默认值写在reducer函数的默认值
 * 2.向仓库派发动作   store.dispatch({type:'ADD'})
 * 3.仓库收到动作后会把动作和老状态传给reducer,返回新的状态
 */


let store = createStore(reducer)


/**
 * console.log(store)
 * 
dispatch: ƒ dispatch(action)
getState: ƒ getState()
replaceReducer: ƒ replaceReducer(nextReducer)
subscribe: ƒ subscribe(listener)
 */



function update() {

    counter.innerHTML = store.getState().number;
}
update()

add.onclick = () => {
    store.dispatch({
        type: 'ADD'
    })

}

minus.onclick = () => {
    store.dispatch({
        type: 'MINUS'
    })
}

// 订阅:事件触发后调用订阅
store.subscribe(update)