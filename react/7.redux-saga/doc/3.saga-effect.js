/**
 * 返回指令对象 effect
 * @param {*} ms 
 */

function delay(ms) {
    return {
        type: 'DELAY',
        payload: ms
    }
}

function takeEvery(type, saga) {
    return {
        type: 'TAKE_EVERY',
        payload: {
            type,
            saga
        }
    }
}

function put(action) {
    return {
        type: 'PUT',
        payload: action
    }
}

function run(gen) {
    
    // gen[Symbol.iterator] 迭代器有这个属性
    let it = gen[Symbol.iterator] ? gen : gen()
    let result;

    function next(value) {

        result = it.next(value)
        console.log(result,'result') 
        if (result 
            && result.value 
            && result.value[Symbol.iterator] 
            && typeof result.value[Symbol.iterator] === 'function') {   // 说明一个迭代器,递归回run
            run(result.value)
        }else {
            if(result && result.value && result.value.type){
            let {type,payload} = result.value
           
                if(type === 'TAKE_EVERY'){

                }else if(type === 'DELAY'){
                    setTimeout(next, payload);
                    return 
                }else if(type === 'PUT'){
    
                }
            }
           
        }
        if (!result.done) {
            next(result.value)
        }
    }
    next()
}

function asyncAddSaga() {
    console.log('调用asyncAddSaga')
}

function* watcherAddSaga() {
  
    yield takeEvery('ADD_ASYNC', asyncAddSaga)
}
// 生成器
function* rootSaga() {
    yield watcherAddSaga()
}


run(rootSaga)