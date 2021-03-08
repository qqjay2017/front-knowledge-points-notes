function BaseComponent() {
    this.type = 'base'
}

var application = function () {
    var components = new Array()
    components.push(new BaseComponent())
    return {
        getComponentCount: function () {
            return components.length
        },
        registerComponent: function (component) {
            if (typeof component == 'object') {
                components.push(component)
            }
        }
    }
}()
console.log(application.getComponentCount())
application.registerComponent(new BaseComponent())
console.log(application.getComponentCount())