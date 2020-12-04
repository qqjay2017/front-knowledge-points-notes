const actions = {
    add(){
        return {
            type:'ADD'
        }
    },
    asyncAdd(){
        return {
            type:'ASYNC_ADD'
        }
    },
    minus(){
        return {
            type:'MINUS'
        } 
    }
}
export default actions;