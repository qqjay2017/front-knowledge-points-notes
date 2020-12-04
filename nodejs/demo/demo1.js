const http = require('http')

const server = http.createServer()
server.on('request',function (request,response) {
    if (request.url=='/a') {
        response.write('a')
    } else if (request.url == '/b') {
        response.write('b')
    }else {
        response.write('ccc')
    }
    response.end();
})
server.listen(3000,function () {
    console.log('启动成功,请通过127.0.0.1:3000访问')
})