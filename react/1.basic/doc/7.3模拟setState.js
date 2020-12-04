class Update {
    constructor(){
        this.state = {
            count:0
        }
        this.queue = [];
    }

    setState(newState){
        this.queue.push(newState)
    }

    flush(){
        for(let i=0;i<this.queue.length-1;i++){
            let update = this.queue[i];

            if(typeof update == 'function'){
                this.state = {...this.state,...update(this.state)}
            }else {
                this.state = {...this.state,...update};
            }
        }
    }
    
}