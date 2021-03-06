function printOrder(urlArr) {
    let result = []
    return new Promise((resolve, reject) => {
        let i = 0;
        next()

        function next(){
            urlArr[i].then(res=>{
                result.push(res)
                i++;
                if(i == urlArr.length){
                        resolve(result)
                }else {
                    next()
                }
            })
        }
    })

}

printOrder('www.baidu.com', 'www.toutiao.com', 'www.douyin.com')