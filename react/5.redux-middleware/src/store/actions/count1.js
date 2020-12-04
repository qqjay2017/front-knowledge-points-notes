
function api(){
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve(1)
        }, 1000);
    })
}

const count1Action = {
    add(payload){
        return {type:'ADD1',payload:payload|1}
    },
    // promise形式的action
    promiseAdd(){
       return {
        type:'ADD1',
        payload:api()
       }
    },
    // thunk形式的action,手动派发
    thunkAdd(payload){
        return function(dispatch){
            dispatch({type:'ADD1',payload:api()})
        }
    },
    thunkAdd1(payload){
        return function(dispatch){
           setTimeout(() => {
            dispatch({type:'ADD1',payload:1})
           }, 1000);
        }
    }
}

export default count1Action;