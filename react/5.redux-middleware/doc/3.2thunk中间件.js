
function thunk(middlewareAPI){
    
    return (next)=>{
        return (action)=>{
            if(typeof action === 'function'){      
                console.log(action)
                action(middlewareAPI.getState,middlewareAPI.dispatch)
            }else {                  
                next(action)
            }
        }
    }
}