import { put, takeEvery,all, take } from 'redux-saga/effects'


/**
 * take   等待仓库派发动作
 * all 合并saga
 * put 触发dispatch
 * takeEvery  新建watch任务
 * @param {*} ms 
 */



const delay = (ms) => new Promise(res => setTimeout(res, ms))

// ...

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
    // 先延迟1000毫秒
  yield delay(1000)
  // put是一个指令对象  让saga向仓库派发一个动作
  yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
    // 监听saga,如果动作的类型是INCREMENT_ASYNC,就调用incrementAsync
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}


/**
 * saga其实就是生成器函数
 */

function* helloSaga() {
    console.log('Hello Sagas!')
  }

// export function * rootSaga(){

//     yield all([
//         helloSaga(),
//         watchIncrementAsync()
//     ])
// }

export function * rootSaga(){

  for (let index = 0; index < 3; index++) { // for循环,只能派发三次
    console.log(index)
      yield take('ASYNC_ADD') // take,等待派发,如果没派发,会卡在这里

       yield put({type:'ADD'})
    
  }
}


