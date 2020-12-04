/**
 * bindActionCreators的实现,包了一层
 * @param {*} actionFunction 
 * @param {*} dispatch 
 */

export default function bindActionCreators(actions, dispatch) {
    const actionType = typeof actions;
    if (actionType === 'function') {    // 传入一个函数,返回调用的函数
        return () => dispatch(actions())
    } else if (actionType === 'object') {       // 传入一个对象,返回一个对象 {add:()=>dispatch(action())}
        return Object.keys(actions).reduce((memo, cur) => {

            memo[cur] = () => dispatch(actions[cur]());
            return memo;
        }, {})
    }

}