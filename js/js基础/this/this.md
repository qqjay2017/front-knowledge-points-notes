 ## this规则
------

 - 当前函数的this是在被调用的时候才能确定的
 - 如果当前的执行上下文处于调用栈的栈顶,这个时候的变量对象变成了活动对象,this指针才能确定
 -  全局对象
   - 全局对象的this指向本身




### 1.函数预编译过程，this指向window

```js
var a = 5;
function test(){
    a=0;
    debugger;
    console.log(a);             
    console.log(this.a);       
    var a;
    console.log(a);     
}
test();  // 0 5  0
console.log("---------------")
new test();     // 0 undefinde 0 
```
- 答案
```js
0
5
0
---------------
0
undefined
0
```
- 解析
- 
运行函数前，进行预编译。
1.test()时：
```js
  GO:{
      a:5,
      test:function test
      this:window
  }
  AO:{
      a:0
  }
//执行test();时，this指向window
```

1.new test()时：
```js
  GO:{
      a:5,
      test:function test
      
  }
  AO:{
      this:{}
      a:0
  }
//执行new test();时，AO会在后台生成this对象，所以this指向ao本身
```



### 2.全局作用域里，this指向window

### 3.call和apply可以改变this指向，区别时参数列表不一样。

### 4. obj.fun();  fun里的this指向obj。
```js
 var obj = {
     a: function () {
         console.log(this.name)
     },
     name: 'aaabb'
 }
 obj.a();//aaabb
```

```js
var name = "222"
var a = {
    name: "111",
    say: function () {
        console.log(this.name);
    }
}
var fun = a.say;
fun()//222;fun中的this指向window
a.say()//111;this指向a
var b = {
    name: "333",
    say: function (fun) {
        //this--->b
        
        fun();
        //运行fun()
        //但是不是this.fun()...是外面的那个fun
       
    }
}
b.say(a.say);//222 
b.say = a.say;
b.say();//333
```

如果搞懂了这题，就没多大问题了。


-----------

进阶

```js
var value = 'window';
var obj = {
    value:'obj'
}
function show(){
    console.log(this.value);
}
show();//window
show.call(obj);//obj
show.call(null);//window,因为传null的时候也默认为window
```


```js
obj.show = show
obj.show()
delete obj.show
```
替换成这样有一样的效果


```js
Function.prototype.newCall = function(obj){
    obj.fn = this;
    obj.fn();
    delete obj.fn;
}
show.newCall(obj)
```

改造成带参数列表的形式

```js
Function.prototype.newCall = function(){
            var xxx = arguments[0]||window;
            var arr = [];
            for(var i=1;i<arguments.length;i++){
                arr.push('arguments['+i+']');
            }
            xxx.fn = this;
            var result = eval('xxx.fn('+arr.join(',')+')');
            delete xxx.fn;
            return result;
        }
```

apply只有两个 形参,所以可以固定参数列表数量

```js
Function.prototype.newApply = function (xxx,args){
            var xxx = xxx || window;
            xxx.fn = this;

            if(!args){
                var result = xxx.fn();
                delete xxx.fn;
                return result
            }else {
                var arr = [];
                for(var i=0;i<args.length;i++){
                    arr.push(args[i]);
                }
                var result = eval('xxx.fn('+arr.join(',')+')');
                return result;
            }
            
        }
```


## call  apply bind

call 第一个参数是this,后面的参数都是函数的形参
apply 第一个参数是this,第二个参数都是函数的形参数组
bind 第一个参数是this,后面的参数都是函数的形参,返回一个newBind函数,newBind函数的形参会跟在bind形参列表的后面
