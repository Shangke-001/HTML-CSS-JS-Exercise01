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