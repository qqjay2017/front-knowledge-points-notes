function promise(middlewareAPI){
    
    return (next)=>{
        return (action)=>{
            if(typeof action.then === 'function'){      // 判断是promise
                action.then((resAction)=>{
                  // promise是调用resolve回来的action
                    middlewareAPI.dispatch(resAction)
                })
            }else {                     // 不是promise
                next(action)
            }
        }
    }
}