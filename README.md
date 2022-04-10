# cycle-swiper
- swiper_normal：普通版
- swiper_component：组件版

## 效果图
![image](https://user-images.githubusercontent.com/18660671/162598923-509789de-e62a-4f09-a1f9-c965e752fad6.png)

## 功能

* 可控制是否自动播放
* 左右箭头切换上一张，下一张
* 鼠标放到箭头上，图片停止自动轮播，鼠标移开接着继续播放
* 点击小圆点可跳转到对应顺序的图片
* 节流处理

## 知识点
- 盒模型
- BFC
- IFC
- Flex布局
- `display: inline-block;`空白间隔问题
- 动画
- 节流
- 指针指向
- 原型链
- 定时器使用
- `position`使用

## 可配置参数
- `imgArr`：图片数组，必选，`[{url: '', imgPath: ''}]`
- `intervalTime`：自动播放图片滑动间隔，可选，默认`1500`
- `autoPlay`：是否自动播放，可选，默认`true`
- `height`：幻灯片高度，可选，默认`300`
- `width`：幻灯片宽度，可选，默认`300`

## 用法
```
let imgArr = [
    {
        url: '#1.png', // 点击图片跳转的链接
        imgPath: './imgs/1.png'
    },
    {
        url: '#2.png',
        imgPath: './imgs/2.png'
    },
    {
        url: '#3.png',
        imgPath: './imgs/3.png'
    },
    {
        url: '#4.png',
        imgPath: './imgs/4.png'
    }
];

new Swiper({
    imgArr: imgArr,
    animationTime: 1000,
    intervalTime: 1000,
    autoplay: true
}).init();
```
