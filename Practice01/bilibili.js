let nowIndex=1;
const maxIndex=3;
let cBannerTimer;
let picList=document.getElementsByClassName("content-banner-picList")[0];
picList.addEventListener("transitionend", () => {
    picList.style.left=-100*nowIndex + "%";
    picList.style.transition="";
});

var contentBannerLayout=function(flag){
    //图片部分
    //let picWidth=document.getElementsByClassName("content-banner-pic")[0].getBoundingClientRect().width;
    //console.log(-picWidth*nowIndex);
    //picList.style.left=-picWidth*nowIndex + "px";
    
    if(flag==0){
        picList.style.left=-100*nowIndex + "%";
        picList.style.transition="left 0.5s ease";
    }
    else if(flag==-1){
        //picList.style.left=-100*nowIndex + "%";
        picList.style.left=-100*0 + "%";
        picList.style.transition="left 0.5s ease";
    }
    else if(flag==1){
        picList.style.left=-100*(maxIndex+1) + "%";
        picList.style.transition="left 0.5s ease";
    }
    
    //picList.style.transform="translateX(${-picWidth*nowIndex}px)";

    // 获取元素实时高度的两个方式
    // window.getComputedStyle(el).width
    // el.getBoundingClientRect().width

    //小圆点呈现
    let pointList=document.getElementsByClassName("content-banner-point-index");
    //console.log(pointList);
    for(let i=0;i<pointList.length;i++){
        if(i==nowIndex-1){
            pointList[i].style.backgroundColor="white";
        }
        else{
            pointList[i].style.backgroundColor="gray";
        }
    }

    //文本部分
    let textCBanner=document.querySelector(".content-banner-text");
    switch(nowIndex){
        case 1:
            textCBanner.innerText="第一张图片文本";
            break;
        case 2:
            textCBanner.innerText="第二张图片文本";
            break;
        case 3:
            textCBanner.innerText="第三张图片文本";
            break;
        // case 3:
        //     textCBanner.innerText="第四张图片文本";
        //     break;
    }
}
var nowIndexAdd=function(){
    nowIndex++;
    if(nowIndex>maxIndex){
        nowIndex=1;
        contentBannerLayout(1);
    }
    else{
        contentBannerLayout(0);
    }
}
var nowIndexDec=function(){
    nowIndex--;
    if(nowIndex<1){
        nowIndex=maxIndex;
        contentBannerLayout(-1);
    }
    else{
        contentBannerLayout(0);
    }
}

//每隔3秒执行一次
var timeContentBanner=function(){
    nowIndexAdd();
}
cBannerTimer=setInterval(timeContentBanner,3000);

//小圆点事件
let points=document.querySelectorAll(".content-banner-point-index");
for(let i=0;i<points.length;i++){
    points[i].addEventListener('click', () =>{
        nowIndex=i+1;
        contentBannerLayout(0);
        clearInterval(cBannerTimer);
        cBannerTimer = setInterval(timeContentBanner,3000);
    })
}


//左右按钮事件
let left=document.querySelector(".content-banner-pre");
let right=document.querySelector(".content-banner-next");
left.addEventListener('click', ()=>{
    nowIndexDec();
    clearInterval(cBannerTimer);
    cBannerTimer = setInterval(timeContentBanner,3000);
})
right.addEventListener('click', ()=>{
    nowIndexAdd();
    clearInterval(cBannerTimer);
    cBannerTimer = setInterval(timeContentBanner,3000);
})

//鼠标移到上面就清除计时器  //计时器叠加
let mouseOverBanner=document.querySelector(".content-banner");
mouseOverBanner.addEventListener('mouseover',
()=>{
    clearInterval(cBannerTimer);
})
mouseOverBanner.addEventListener('mouseout',
()=>{
    clearInterval(cBannerTimer);
    cBannerTimer = setInterval(timeContentBanner,3000);
})


