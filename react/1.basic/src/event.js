import {
    updateQueue
} from './Component';


/**
 * 给哪个dom绑定事件
 * @param {HTMLElement} dom dom元素
 * @param {*} eventType 事件类型   onclick
 * @param {*} listener     事件函数
 */

export function addEvent(dom, eventType, listener) {
    let store = dom.store || (dom.store = {}); // 事件回调函数存在dom.store.onclick
    store[eventType] = listener;
    // 如果document没有onclick,就挂一下
    if (!document[eventType]) {
        //eventType  = onclick

        // document.addEventListener()  为了方便写成下面的形式
        document[eventType] = dispatchEvent;
            // click事件触发dispatchEvent函数
    }

}

/**
 * 
 * @param {Event} event 原生事件对象
 */
let syntheticEvent;

function dispatchEvent(event) {
    let {
        target,
        type
    } = event;
    let eventType = `on${type}` // onclick


    updateQueue.isBatchingUpdate = true; // 进入批量更新模式
    syntheticEvent = createSyntheticEvent(event)

    // 实现合成事件的冒泡
    while (target) {
        let {
            store
        } = target;

        let listener = store && store[eventType];

        // react中的event不是原生的,自己做一个event合成对象,永远只有这么一个对象
        listener && listener.call(target, syntheticEvent)
        // 一直找上去,去找所有的父级dom.store[eventType]
        target = target.parentNode
    }
    // 用完之后全部清空
    for (let key in syntheticEvent) {
        syntheticEvent[key] = null;
    }
    updateQueue.batchUpdate() // 更新,执行完isBatchingUpdate变成false
}


/**
 * 创建一个合成事件
 * 
 * 为什么需要合成事件
 * 
 * 1.可以实现批量更新
 * 2. 可以实现事件对象的缓存和回收
 * @param {Event} nativeEvent 原生event对象
 */
function createSyntheticEvent(nativeEvent) {
    let syntheticEvent = {};

    for (let key in nativeEvent) {
        syntheticEvent[key] = nativeEvent[key]
    }
    return syntheticEvent
}