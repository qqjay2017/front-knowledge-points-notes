// 写一个 machine 函数达到如下效果
const defer = sec => new Promise(resolve => setTimeout(resolve, sec * 1000));

// function machine(name) {
//     const tasks = []
//     const initTask = ()=>{
//         console.log(`start ${name}`)
//     }

//     tasks.push(initTask)

//     function _do(str){
//         const task = ()=>{
//             console.log(`${name} ${str}`)
//         }
//         tasks.push(task)
//         return this
//     }

//     function wait(sec) {
//         const task = async () => {
//           console.log(`wait ${sec}s`);
//           await defer(sec);
//         };
//         tasks.push(task);
//         return this;
//       }

//     function waitFirst(sec) {
//         const task = async () => {
//           console.log(`wait ${sec}s`);
//           await defer(sec);
//         };

//         tasks.unshift(task);
//         return this;
//       }

//      function execute(){
//          tasks.reduce(async(memo,cur)=>{
//             await memo;
//             await cur();
//          },Promise.resolve)
//      }

//      return {
//          do:_do,
//          wait,
//          waitFirst,
//          execute

//      }

// }

// 去除this的写法

function machine(name) {
    const context = {}
    const tasks = []
    const initTask = () => {
        console.log(`start ${name}`)
    }

    tasks.push(initTask)

    function _do(str) {
        const task = () => {
            console.log(`${name} ${str}`)
        }
        tasks.push(task)
        return context
    }

    function wait(sec) {
        const task = async () => {
            console.log(`wait ${sec}s`);
            await defer(sec);
        };
        tasks.push(task);
        return context;
    }

    function waitFirst(sec) {
        const task = async () => {
            console.log(`wait ${sec}s`);
            await defer(sec);
        };

        tasks.unshift(task);
        return context;
    }

    function execute() {
        tasks.reduce(async (memo, cur) => {
            await memo;
            await cur();
        }, Promise.resolve)
    }

    return Object.freeze(
        Object.assign(context, {
            do: _do,
            wait,
            waitFirst,
            execute

        })
    )

}


machine('ygy').execute();
// start ygy
machine('ygy')
    .do('eat')
    .execute();
// start ygy
// ygy eat
machine('ygy')
    .wait(5)
    .do('eat')
    .execute();
// start ygy
// wait 5s（这里等待了5s）
// ygy eat
machine('ygy')
    .waitFirst(5)
    .do('eat')
    .execute();