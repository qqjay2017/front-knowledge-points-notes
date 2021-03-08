function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, false)[attr];
    }
}



function move(obj, targetObj, callback) {
    clearInterval(obj.timer);
    var speed, icur;
    obj.timer = setInterval(function () {
        var bstop = true;
        for (var attr in targetObj) {
            if (targetObj[attr] === 'opacity') {
                icur = parseFloat(getStyle(obj, attr) * 100);
            } else {
                icur = parseFloat(getStyle(obj, attr));
            }
            // console.log(icur);
            speed = (targetObj[attr] - icur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if (targetObj[attr] == icur) {
                clearInterval(obj.timer);
            } else {
                if (attr == 'opacity') {
                    obj.style[attr] = (icur + speed) / 100;
                } else {
                    obj.style[attr] = icur + speed + 'px';
                }
            }
            if (icur != targetObj[attr]) {
                bstop = false;
            }else {
                bstop = true;
            }
            if (bstop) {

                clearInterval(obj.timer);
                typeof callback == 'function' ? callback() : '';
            }
        }
    }, 30)
}