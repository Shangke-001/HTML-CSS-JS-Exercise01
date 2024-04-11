//引入Express
const express=require('express');

//创建应用对象
const app=express();

//创建路由规则
app.get('/sever', (request, response)=>{
    //设置响应头
    response.setHeader('Access-Control-Allow-Origin', '*');
    //设置响应体
    response.send('Hello Express - 2');
})

app.post('/sever', (request, response)=>{
    //设置响应头
    response.setHeader('Access-Control-Allow-Origin', '*');
    //设置响应体
    response.send('Hello Express Post');
})

app.get('/json-sever', (request, response)=>{
    //设置响应头
    response.setHeader('Access-Control-Allow-Origin', '*');

    const data={
        welcome: 'Hello and Welcome',
        name: 'nst'
    }
    let str=JSON.stringify(data);

    //设置响应体
    response.send(str);
})

//监听端口启动服务
app.listen(8000, ()=>{
    console.log('服务启动，端口8000监听中...');
})