// 1. 定义 EventEmitter 类
type EventHandler = (...args: any[]) => any

class EventEmitter {
    private c = new Map<string, EventHandler[]>();

    // 订阅指定的主题
    subscribe(topic: string, ...handlers: EventHandler[]) {
        let topics = this.c.get(topic);
        if(!topics){

            this.c.set(topic, topics = [])
        }
        topics.push(...handlers);

    }
    unsubscribe(topic:string,handler?:EventHandler){
        if(!handler){
            return this.c.delete(topic)
        }
        const topics = this.c.get(topic)
        if(!topics){
            return  false;
        }
        const index = topics.indexOf(handler)
        if(index<0){
            return  false;
        }
        topics.splice(index,1);
        if(topics.length === 0){
            this.c.delete(topic)
        }
        return  true;
    }

    publish(topic:string,...args:any[]):any[]|null{
        const topics = this.c.get(topic);
        if(!topics){
            return  null;
        }
        return topics.map(handler=>{
            try {
                return handler(...args)
            }catch (e){
                console.log(e)
                return null;
            }
        })
    }
}


export {
    EventEmitter
}

