(function () {
    'use strict';

    class EventEmitter {
        constructor() {
            this.c = new Map();
        }
        // 订阅指定的主题
        subscribe(topic, ...handlers) {
            let topics = this.c.get(topic);
            if (!topics) {
                this.c.set(topic, topics = []);
            }
            topics.push(...handlers);
        }
        unsubscribe(topic, handler) {
            if (!handler) {
                return this.c.delete(topic);
            }
            const topics = this.c.get(topic);
            if (!topics) {
                return false;
            }
            const index = topics.indexOf(handler);
            if (index < 0) {
                return false;
            }
            topics.splice(index, 1);
            if (topics.length === 0) {
                this.c.delete(topic);
            }
            return true;
        }
        publish(topic, ...args) {
            const topics = this.c.get(topic);
            if (!topics) {
                return null;
            }
            return topics.map(handler => {
                try {
                    return handler(...args);
                }
                catch (e) {
                    console.log(e);
                    return null;
                }
            });
        }
    }

    const eventEmitter = new EventEmitter();
    // 订阅
    eventEmitter.subscribe("ts", (msg) => {
        console.log(`收到订阅的信息: ${msg}`);
    });
    // 多个地方订阅
    eventEmitter.subscribe("ts", (msg1) => {
        console.log(`第二次订阅:收到订阅的信息: ${msg1}`);
    });
    // 推送
    eventEmitter.publish('ts', "第一次推送");
    // 取消订阅
    eventEmitter.unsubscribe("ts");
    eventEmitter.publish('ts', "第二次推送");
    window.eventEmitter = eventEmitter;

}());
//# sourceMappingURL=bundle.js.map
