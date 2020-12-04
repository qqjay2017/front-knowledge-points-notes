function createBrowserHistory() {
    let globalHistory = window.history
    let listeners = [];

    function block(prompt) {

    }

    function createHref(location) {

    }

    function go(n) {
        // 原生的go
        globalHistory.go(n)
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
        pathname: window.location.pathname,
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
    /**
     * 
     * @param {String} path 路径
     * @param {Object} state 路径的描述信息
     */
    function push(path, state) {
        const action = 'PUSH'
        globalHistory.pushState(state, null, path);
        let location = {
            state,
            pathname: path
        }
        setState({
            action,
            location
        })
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
        length: globalHistory.length,
        listen,
        location,
        push,
        replace,
    }
    return history;

}

export default createBrowserHistory;