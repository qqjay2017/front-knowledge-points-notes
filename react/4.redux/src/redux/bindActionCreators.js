/**
 * bindActionCreators的实现,包了一层  { add : dispatch({type:'add'})}
 * @param {*} actionFunction 
 * @param {*} dispatch 
 */

 function bindActionCreator(actions, dispatch){
     return (...args) => dispatch(actions(...args))
 }

export default function bindActionCreators(actions, dispatch) {
    const actionType = typeof actions;
    if (actionType === 'function') {    // 传入一个函数,返回调用的函数
        return bindActionCreator(actions, dispatch)
    } else if (actionType === 'object') {       // 传入一个对象,返回一个对象 {add:()=>dispatch(action())}
        return Object.keys(actions).reduce((memo, cur) => {

            memo[cur] = bindActionCreator(actions[cur],dispatch)
            
            // (...args) => dispatch(actions[cur](...args));
            return memo;
        }, {})
    }

}