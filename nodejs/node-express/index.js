const express = require('express')
const app = express()
const port = 3000
app.get('/a',(req,res)=>{
    res.send('helloWorld')
})

app.listen(port,()=>{
    console.log(`启动成功,从127.0.0.1:${port}启动`)
})