//求屏幕滚动距离，兼容ie
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    } else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + ducoment.documentElement.scrollTop
        }
    }
}

//视口尺寸，兼容ie
function getViewportOffset() {
    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            head: window.innerHeight
        }
    } else {
        if (document.compatMode === "BackCompat") {
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            }
        } else {
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            }
        }
    }
}


//封装getStyle方法,兼容ie
function getStyle(elem, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop];
    } else {
        return elem.currentStyle[prop];
    }
}


//取消事件冒泡
function stopBubble(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}

//取消默认事件
function cancelHandler(e) {
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue = true;
    }
}

console.log("myTool");


//removeClass
function removeClass(className) {
    var ele = document.getElementsByClassName(className);
    while (ele.length > 0) {
        ele[0].parentNode.removeChild(ele[0]);
    }
}

//获取style
function getStyle (obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];

    }else {
        return getComputedStyle(obj,false)[attr];
    }

}
