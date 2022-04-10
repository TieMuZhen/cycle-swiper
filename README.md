# cycle-swiper
- swiper_normal：普通版
- swiper_component：组件版

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

## 用法
#### 可配置参数
- `imgArr`：图片数组
- `animationTime`：动画执行的时间
- `intervalTime`：图片停留的时间
- `autoPlay`：是否自动播放
- `height`：幻灯片高度
- `width`：幻灯片宽度
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
