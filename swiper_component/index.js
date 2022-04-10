let imgArr = [
    {
        url: '#1.png',
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