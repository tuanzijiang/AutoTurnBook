//variable
var playFlag=false;//是否播放的标志
var totalPage=56;//总页数的标志
var currentPage=0;//当前页面
var changeByHand=false;//是否进入手动翻书
var intervalCSS=600;//翻一次页面的ms数
var autoFuncHandler;//自动翻书的句柄
var turnDirection=true;//翻页的方向,true-正向,false-负向

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