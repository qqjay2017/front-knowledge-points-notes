var personArr = [{
        name: "张三",
        src: "./src/img/1.jpg",
        desc: "心情不好",
        sex: "female"
    },
    {
        name: "李四",
        src: "./src/img/2.jpg",
        desc: "心情一般",
        sex: "male"
    },
    {
        name: "王五",
        src: "./src/img/3.jpg",
        desc: "心情还行",
        sex: "female"
    },
    {
        name: "马六",
        src: "./src/img/4.jpg",
        desc: "心情很好",
        sex: "male"
    },
    {
        name: "男赵七",
        src: "./src/img/5.jpg",
        desc: "面朝大海",
        sex: "female"
    },
    {
        name: "女赵七",
        src: "./src/img/5.jpg",
        desc: "面朝大海",
        sex: "male"
    }
]

var oUl = document.getElementsByTagName('ul')[0];
var oInput = document.getElementsByClassName('search-box')[0];
var oP = document.getElementsByClassName('tab')[0];

var newArr;
var state = {
    text: '',
    sex: 'a'
}
//根据数组渲染html
function renderList(arr) {
    var str = "";
    arr.forEach(element => {
        str += '<li>\
        <img src=' + element.src + '>\
        <p class="username">' + element.name + '</p>\
        <p class="desc">' + element.desc + '</p>\
        </li>';
    });
    // console.log(str);
    oUl.innerHTML = str;
}

renderList(personArr);

//oninput事件,每次输入框非内容发生改变,都会执行oninput
oInput.oninput = function (e) {


    state.text = this.value;
    // newArr = filterText(text, personArr);
    // renderList(newArr);
    // console.log(newArr);
    // console.log(text);
    renderList(lastfilter(personArr));
}

//根据输入框筛选 
function filterText(text, arr) {
    return arr.filter(function (element, index) {
        return element.name.indexOf(text) != -1 ? true : false;
    })
}

//添加点击事件,让他冒泡
oP.addEventListener('click', function (e) {
    if (e.target.nodeName == 'SPAN') {
        document.getElementsByClassName('active')[0].className = '';
        e.target.className = 'active';
        state.sex = e.target.getAttribute('sex');

        renderList(lastfilter(personArr));
    }
}, false)

//根据性别筛选
function filterSxe(sex, arr) {
    if (sex == 'a') {
        return arr;
    } else {
        return arr.filter(function (element, index) {
            return element.sex == sex;
        })
    }
}

    //混合筛选
    function filterFunc(obj) {
        return function (arr) {
            var lastArr = arr;
            for (var prop in obj) {
                lastArr = obj[prop](state[prop], lastArr);
            }
            return lastArr;
        }
    }
    var lastfilter = filterFunc({
        sex: filterSxe,
        text: filterText
    });
    