function createHashHistory(){
    let stack = [];
    let index = -1;
    let action = ''     // 最新的动作 POP PUSH
    let state = {};     // 最新的状态
    let globalHistory = window.history
    let listeners = [];
   
    function block(prompt) {

    }

    function createHref(location) {

    }

    function go(n) {
        action = 'POP';
        index+=n;
        let nextLocation = stack[index];
        if(nextLocation){
            state = nextLocation.location.state;
        }
        window.location.hash = nextLocation.pathname
    }

    function goBack() {
        go(-1)
    }

    function goForward() {
        go(1)
    }

    function listen(listener) {
        listeners.push(listener);
        return function(){
            // 把不是当前路由的干掉
            listeners = listeners.filter(l=>l!== listener);
        }
    }
    let location = {
        pathname: window.location.hash?window.location.hash.slice(1):'/',
        search: "",
        hash: "",
        state: globalHistory.state,
        key: "4l4g5s"
    };

    function setState(newState) {
        // 覆盖
        Object.assign(history, newState);
        history.length = globalHistory.length;
        listeners.forEach(listener=>listener(history.location))
    }

    window.addEventListener('hashchange',()=>{
        let location = {
            state,
            pathname:   window.location.hash
        }
      
        setState({
            action,
            location

        })

        if(action=='PUSH'){
            stack[++index] = history.location
        }
    })

    /**
     * 
     * @param {String} path 路径
     * @param {Object} state 路径的描述信息
     */
    function push(path, nextState) {
        // state = state;
         action = "PUSH"
         state = nextState;
        window.location.hash = path;
    }

    function replace(path, state) {

    }
    let history = {
        action: "POP",
        // block,
        // createHref,
        go,
        goBack,
        goForward,
        // length: globalHistory.length,
        listen,
        location,
        push,
        replace,
    }
    window.location.hash =  window.location.hash? window.location.hash.slice(1):'/'
    return history;
}


export default createHashHistory;