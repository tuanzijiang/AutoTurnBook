# autoTurnBook

This is an auto-played book to my girlfriend as a gift in Valentine's Day. The effect simulates [filp book](http://www.aiqig.com/31.html).

In addtion, I hide some surprise in it. Normally it can be turned to page 56 automatically, but there are 57 pages in this book.

So how to turn to page 57? This is a secret.



## Playing Resule

#### This is the overall result. Click the play button ,then the book can be play automatically.

![overall](https://github.com/sumAlbert/AutoTurnBook/blob/master/src/display/overall.gif?raw=true)


#### This is the hidden page with a little mosaic.

![last page](https://github.com/sumAlbert/AutoTurnBook/blob/master/src/display/lastPage.png?raw=true)

## Run it

I have use `gulp` to compress it. As a result, it is very easy to run it.The process is as follows:

1. download this [project](https://github.com/sumAlbert/AutoTurnBook/archive/master.zip)
2. use a browser to open `build/autoTurnBook.html`

## Implementation

### Development Tool

- IDE: [webstorm](https://www.jetbrains.com/webstorm/)
- CSS Preprocessor: [less](http://lesscss.cn/)
- Packaging tools: [gulp](https://www.gulpjs.com.cn/)


### Key Methord

1. Create a 3D-stage for this auto-played book. Set `transform-style` to `preserve-3d` and `overflow` to `visible` in the wrapper.

   Then the browser will render it in 3D space. Otherwise the result seems to be flatten.

2. Set the position for audience. Use `perspective` and `perspective-origin`. The `perspective` define the distance between audience's eyes and screen. The `perspective-orign` define the corresponding position.

```
.playerBox{
  position: relative;
  overflow: visible;
  height: 450px;
  width: 660px;
  border-radius: 3px;
  box-shadow: 0 0 3px 1px #2b2b2b;
  transform-style: preserve-3d;
  perspective: 2000px;
  perspective-origin: 50% 50%;
}
```
---

3. Use `translate3d(x,y,z)` to define every page initial position. The z-value of nth-page is `-npx`. (e.g For the second page, set `translate3d(0,0,-2px)`).Then the page at the bottom will be hidden

4. Define the axis of rotating with `transform-origin`.The last position of nth-page is `(npx,0,0)`.(e.g For the second page,set `translate3d(2px,0,0)`).The the page at the bottom will be shown.

5. The value of `overflow` for single page is `hidden`.

6. Use `less` to create generator can simplify the above process

```

//页面的通用样式，开发的时候讲display设置为none，在特定页面设置用id选择器设置成display:block进行单一页面开发
.page{
  height: 100%;
  width: 100%;
  position: absolute;
  overflow: hidden;
  display: block;//开发时控制页面消失
  top: 0;
  left: 0;
  transition: all .1s;
  transform-origin: left center;
  box-shadow: 0 0 3px 1px rgba(43,43,43,.1),0 0 50px 1px rgba(43,43,43,.1) inset ;
}
//播放部分，page生成器，开始
.pageGenerate(@pageNum);

.pageGenerate(@n,@i:0) when (@i<@n){
  //首页
  .page-@{i} when(@i = 0){
    .page;
    background: #be2227;
    transform: translateZ(0px - @i);
  }

  //其他页面
  .page-@{i} when(not (@i = 0) ){
    .page;
    background: #f2f2f2;
    transform: translateZ(0px - @i);
  }
  //其他页面的收尾伪元素
  .page-@{i}::before when(not (@i = 0) ){
    position: absolute;
    content: "@{i}";
    bottom: 5px;
    right: 5px;
  }
  //递归调用
  .pageGenerate(@pageNum,@i+1);
}
//播放部分，page生成器，结束
```
---
6. Use `transition` css attribute to control the duration of turing one page. Use `setInterval` and `clearInterval` to play or stop the book.

7. It's better to reduce duration of turing one page.

8. The items in every page is absolute position. We alse can use `translate3d` to control the position, which can run `GPU` to accelerate the speed of rendering.

Reproduced and please indicate the source

[Try out by yourself!](https://github.com/sumAlbert/AutoTurnBook/archive/master.zip)



