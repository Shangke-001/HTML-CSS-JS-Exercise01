//Ajax GET 请求   点击发送GET请求
const btn=document.querySelector('.btnRequest');
const requestArea=document.querySelector('#responseArea');
btn.addEventListener('click',()=>{
    //创建对象
    const xhr=new XMLHttpRequest();

    //初始化，设置请求方法和url
    xhr.open('GET', 'http://127.0.0.1:8000/sever?a=100&b=22');

    //发送
    xhr.send();

    //事件绑定，处理服务端返回结果
    xhr.onreadystatechange=function(){
        //检查readystate
        if(xhr.readyState===4){
            //检查响应状态码
            if(xhr.status>=200 && xhr.status<300){
                //处理结果
                // console.log(xhr.status);
                // console.log(xhr.statusText);
                // console.log(xhr.getAllResponseHeaders());
                // console.log(xhr.response);

                requestArea.innerHTML=xhr.response;
            }
            else{
            }
        }
    }
})

//Ajax POST 请求   mouseover发送POST请求
const postResult=document.querySelector('#postResult');
postResult.addEventListener('mouseover',()=>{
    //创建对象
    const xhr=new XMLHttpRequest();

    //初始化，设置请求方法和url
    xhr.open('POST', 'http://127.0.0.1:8000/sever');

    //设置请求头
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

    //发送
    xhr.send("a=100&b=22&c=1");

    //事件绑定，处理服务端返回结果
    xhr.onreadystatechange=function(){
        //检查readystate
        if(xhr.readyState===4){
            //检查响应状态码
            if(xhr.status>=200 && xhr.status<300){
                //处理结果
                // console.log(xhr.status);
                // console.log(xhr.statusText);
                // console.log(xhr.getAllResponseHeaders());
                // console.log(xhr.response);

                postResult.innerHTML=xhr.response;
            }
            else{
            }
        }
    }
})

//Ajax响应JSON数据    window下按下enter响应JSON数据
const jsonResult=document.querySelector('#jsonResult');
window.addEventListener('keydown',(event)=>{
    if(event.code=='Enter'){
        //创建对象
        const xhr=new XMLHttpRequest();

        //指定响应体数据内容
        xhr.responseType='json';

        //初始化，设置请求方法和url
        xhr.open('GET', 'http://127.0.0.1:8000/json-sever');

        //发送
        xhr.send();

        //事件绑定，处理服务端返回结果
        xhr.onreadystatechange=function(){
            //检查readystate
            if(xhr.readyState===4){
                //检查响应状态码
                if(xhr.status>=200 && xhr.status<300){
                    //处理结果
                    jsonResult.innerHTML=xhr.response.welcome+' ---from '+xhr.response.name;
                }
                else{
                }
            }
        }
    }
})

//超时与网络异常处理    点击发送GET请求
const btnTOE=document.querySelector('#timeoutOrErrorBtn');
const toeResult=document.querySelector('#timeoutOrError');
btnTOE.addEventListener('click',()=>{
    const xhr=new XMLHttpRequest();
    xhr.timeout=2000;
    xhr.open('GET', 'http://127.0.0.1:8000/delay-sever');
    xhr.send();
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4){
            if(xhr.status>=200 && xhr.status<300){
                toeResult.innerHTML=xhr.response;
            }
        }
    }
    xhr.ontimeout=function(){
        toeResult.innerHTML='TimeOut 2s';
    }
    xhr.onerror=function(){
        toeResult.innerHTML='Network Error';
    }
})

//Ajax请求发送与手动取消    并解决重复发送问题
const btnAborts=document.querySelectorAll('#abortRequest');
const abortResult=document.querySelector('#abortResult');
let xa=null;
let flagIsSending=false;
btnAborts[0].addEventListener('click',()=>{
    if(flagIsSending==true){
        xa.abort();
    }
    xa=new XMLHttpRequest();
    flagIsSending=true;
    xa.open('GET', 'http://127.0.0.1:8000/delay-sever');
    xa.send();
    xa.onreadystatechange=function(){
        if(xa.readyState===4){
            if(xa.status>=200 && xa.status<300){
                abortResult.innerHTML=xa.response;
            }
            flagIsSending=false;
        }
    }
})
btnAborts[1].addEventListener('click',()=>{
    xa.abort();
    flagIsSending=false;
    abortResult.innerHTML='Request cancle';
})

//Axios发送Ajax请求  Vue和React推荐的工具包
const btnAxioss=document.querySelectorAll('#axiosTry');
const axiosResult=document.querySelector('#axiosResult');
axios.defaults.baseURL='http://127.0.0.1:8000';
btnAxioss[0].addEventListener('click',()=>{
    axios.get('/sever',{
        params: {
            id:100,
            vip:200,
        },
        headers:{
            a:1,
            b:2,
        }
    })
    .then(res => {
        axiosResult.innerHTML=res.data;
    })
})
btnAxioss[1].addEventListener('click',()=>{
    axios.post('/sever',{
        height:180,
        weight:180,
    },{
        params: {
            id:100,
            vip:200,
        },
        headers:{
            a:1,
            b:2,
        }
    })
    .then(res => {
        axiosResult.innerHTML=res.data;
    })
})
btnAxioss[2].addEventListener('click', ()=>[
    axios({
        method:'post',
        url: '/sever',
        params:{
            id:100,
            vip:7,
        },
        headers:{
            a:100,
            b:200,
        },
        data: {
            height:180,
            weight:180,
        }
    }).then((res)=>{
        axiosResult.innerHTML=res.data;
    })
])