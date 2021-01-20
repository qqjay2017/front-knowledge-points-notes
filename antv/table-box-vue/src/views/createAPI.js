import Vue from 'vue'

export default function(Component, props,host){
    // 创建vue实例
    const instance = new Vue({
        render: h => { // vdom
            return h(Component, {props})
        }
    }).$mount();
    // const host = document.getElementById("app")
    host.appendChild(instance.$el);
    // 添加一个销毁方法
    const comp = instance.$children[0];
    comp.remove = function () {
        host.removeChild(instance.$el)
        instance.$destroy();
    }

    return comp;
}