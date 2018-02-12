//variable
var playFlag=false;//是否播放的标志
var totalPage=56;//总页数的标志
var currentPage=0;//当前页面
var changeByHand=false;//是否进入手动翻书
var intervalCSS=600;//翻一次页面的ms数
var autoFuncHandler;//自动翻书的句柄
var turnDirection=true;//翻页的方向,true-正向,false-负向
var musicFlag=false;//是否播放音乐


// 事件捆绑
//播放事件
document.getElementById("playBox-play").addEventListener("click",function () {
    //改变播放按钮形式
    document.getElementById("playBox-play").style.cssText="display:none";
    document.getElementById("playBox-stop").style.cssText="display:inline";
    playFlag=true;


    //自动播放函数
    autoFuncHandler=setInterval(function () {
        if(turnDirection)
            turnToNext();
        else
            turnToLast();

        //到终点了，停止自动播放
        if(turnDirection&&currentPage===totalPage){
            clearInterval(autoFuncHandler);
            document.getElementById("playBox-stop").style.cssText="display:none";
            document.getElementById("playBox-play").style.cssText="display:inline";
            playFlag=false;
            turnDirection=false;
        }
        if(!turnDirection&&currentPage===0){
            clearInterval(autoFuncHandler);
            document.getElementById("playBox-stop").style.cssText="display:none";
            document.getElementById("playBox-play").style.cssText="display:inline";
            playFlag=false;
            turnDirection=true;
        }
    },intervalCSS/4);

});
//停止播放事件
document.getElementById("playBox-stop").addEventListener("click",function () {
    //改变暂停按钮的样式
    document.getElementById("playBox-stop").style.cssText="display:none";
    document.getElementById("playBox-play").style.cssText="display:inline";
    playFlag=false;

    //停止自动播放
    clearInterval(autoFuncHandler);

});
//进入下一面事件
document.getElementById("playBox-next").addEventListener("click",function () {
    turnDirection=true;
    if(!changeByHand){
        changeByHand=true;
        turnToNext();
        setTimeout(function () {
            changeByHand=false;
        },intervalCSS/4);
    }
});
//回到上一面事件
document.getElementById("playBox-last").addEventListener("click",function () {
    turnDirection=false;
    if(!changeByHand){
        changeByHand=true;
        turnToLast();
        setTimeout(function () {
            changeByHand=false;
        },intervalCSS/4);
    }
});
//播放音频
document.getElementById("font-music").addEventListener("click",function (event) {
    if(!musicFlag){
        //修改muscic icon动画属性
        event.target.style.animationPlayState="running";
        event.target.style.webkitAnimationPlayState="running";
        musicFlag=true;
        document.getElementById("page52-music-audio").play();
    }
    else{
        //修改music icon动画属性
        event.target.style.animationPlayState="paused";
        event.target.style.webkitAnimationPlayState="paused";
        musicFlag=false;
        document.getElementById("page52-music-audio").pause();
    }
});
//音频监听
document.getElementById("page52-music-audio").ontimeupdate=function (event) {
  audioWatch(event);
};

//函数
//跳转到任意页面
var turnToPage=function (goalPage) {
    var i;
    //往后翻
    if(currentPage<goalPage){
        for(i=currentPage;i<goalPage;i++){
            (function (i) {
                setTimeout(function () {
                    document.getElementById("page"+i).style.cssText="transform: rotateY(-"+(91-i*0.01)+"deg) translateZ("+(0-i)+"px);";
                    if(i===goalPage-1){
                        currentPage=goalPage;
                    }
                },50+(i-currentPage)*intervalCSS/4);
            })(i);
        }
    }

    //往前翻
    if(currentPage>goalPage){
        for(i=currentPage;i>=goalPage;i--){
            (function (i) {
                setTimeout(function () {
                    document.getElementById("page"+i).style.cssText="transform: rotateY(0deg) translateZ("+(0-i)+"px);";
                    if(i===goalPage){
                        currentPage=goalPage;
                    }
                },50-(i-currentPage)*intervalCSS/4);
            })(i);
        }
    }
};
//跳转到下一页
var turnToNext=function () {
    if(currentPage<totalPage){
        turnToPage(currentPage+1);
    }
    else{
        document.getElementById("playBox-stop").style.cssText="display:none";
        document.getElementById("playBox-play").style.cssText="display:inline";
        currentPage=currentPage+1<totalPage?currentPage+1:totalPage;
    }
};
//跳转到上一面
var turnToLast=function () {
    if(currentPage>0){
        turnToPage(currentPage-1);
    }
    else{
        document.getElementById("playBox-stop").style.cssText="display:none";
        document.getElementById("playBox-play").style.cssText="display:inline";
        currentPage=currentPage-1>0?currentPage-1:0;
    }
};
//音频监听函数
var audioWatch=function (event) {
    var poem=["致王女士","我想跑来找你","只因为","当一个人想和另一个人共度余生","真的很希望余生马就能开始","难道不是吗","情人节快乐","你的小可爱"];
    var currentTime=event.target.currentTime;
    console.log(currentTime+"s，歌能尽，爱无穷。团子每时每秒都很爱票票，第52秒就是钥匙哦");
    if(currentTime>=52&&currentTime<53){
        totalPage=57;
        for(var i=1;i<=poem.length;i++){
            document.getElementsByClassName("secret-font"+i)[0].innerHTML=poem[i-1];
        }
    }
    if(currentTime>53){
        totalPage=56;
        for(var i=1;i<=poem.length;i++){
            document.getElementsByClassName("secret-font"+i)[0].innerHTML="";
        }
    }
};


