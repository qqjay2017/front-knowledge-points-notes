var getUserName = function (firstName, lastName) {
    return firstName + lastName;
};
var obj = {};
function attr(val) {
    if (typeof val === 'string') {
        obj.name = val;
    }
    else {
        obj.age = val;
    }
}
;
attr('zf');
attr(9);
console.log(obj);
