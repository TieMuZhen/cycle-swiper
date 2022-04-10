/**
 * obj: 
 * imgArr 图片数组
 * animationTime  动画执行的时间
 * intervalTime  图片停留的时间
 * autoPlay 是否自动播放
 * height 幻灯片高度
 * width 幻灯片宽度
 */

 function Swiper(obj){
    this.imgArr = obj.imgArr || [];
    this.animationTime = obj.animationTime || 1500;
    this.intervalTime = obj.intervalTime || 1500;
    this.autoPlay = obj.autoPlay || true;
    this.slideHeight = obj.height || 300;// 幻灯片高度
    this.slideWidth = obj.width || 300; // 幻灯片宽度

    this.swiperList;  // 轮播图片dom容器
    this.swiperUl; // 图片的<ul></ul>
    this.swiperSpots; // 小圆点按钮的<ul></ul>
    this.leftBtn; // ‘上一张’按钮
    this.rightBtn; // ‘下一张’按钮
    this.intervalTimer; // 自动播放timer

    this.curIndex = 0; // 当前显示的是第几张照片
    this.preTime = Date.now(); // 用于节流的时间戳 1649550850552
}

Swiper.prototype = {
    init: function(){
        this.initDom();
        this.initImgs();
        this.initSpots();
        this.bindEvents();
    },
    initDom: function(){
        // 轮播图片dom容器添加照片<ul></ul>
        this.swiperList = document.getElementById('swiper-list');
        this.swiperList.style.height = `${this.slideHeight}px`;
        this.swiperList.style.width = `${this.slideWidth}px`;

        this.swiperUl = document.createElement('ul');
        this.swiperUl.className = 'swiper-main';
        this.swiperUl.style.width = `${(this.imgArr.length + 1) * 100}%`

        this.swiperList.appendChild(this.swiperUl);

        // 轮播图片dom容器添加小圆点<ul></ul>
        this.swiperSpots = document.createElement('ul');
        this.swiperSpots.className = 'swiper-spots';
        this.swiperList.appendChild(this.swiperSpots);

        // ‘上一张’按钮
        this.leftBtn = document.createElement('img');
        this.leftBtn.src = './imgs/left.png';
        this.leftBtn.className = 'left-btn'
        this.swiperList.appendChild(this.leftBtn);

        // '下一张'按钮
        this.rightBtn = document.createElement('img');
        this.rightBtn.src = './imgs/right.png';
        this.rightBtn.className = 'right-btn'
        this.swiperList.appendChild(this.rightBtn);

        // 只有一张图片的话不显示翻页按钮
        if(this.imgArr.length == 1){
            this.leftBtn.style.display = 'none';
            this.rightBtn.style.display = 'none';
        }
    },
    initImgs: function(){
        let li = ''
        for(let i = 0; i < this.imgArr.length; i++){
            li += `<li class="img" index=${i} style="background-image: url(${this.imgArr[i].imgPath});height:${this.slideHeight}px;width:${this.slideWidth}px;"></li>`
        }
        // 用于处理无缝无限循环
        li += `<li class="img" index=${0} style="background-image: url(${this.imgArr[0].imgPath});height:${this.slideHeight}px;width:${this.slideWidth}px;"></li>`
        this.swiperUl.innerHTML = li;
    },
    initSpots: function(){
        let li = '';
        for (let i = 0; i < this.imgArr.length; i++) {
            if (i === 0) {
                li += `<li class="dot on" index=${i} style="height:${this.slideHeight * 0.05}px;width:${this.slideWidth * 0.05}px;"></li>`;
            } else {
                li += `<li class="dot" index=${i} style="height:${this.slideHeight * 0.05}px;width:${this.slideWidth * 0.05}px;"></li>`;
            }
        }
        this.swiperSpots.innerHTML = li;
    },
    bindEvents: function(){
        let that = this;
        // 点击“<”时事件处理
        this.leftBtn.addEventListener("click", function(){
            that.throttle(that.preSlider, 500);
        })
        
        // 点击“>”时事件处理
        this.rightBtn.addEventListener("click", function(){
            that.throttle(that.nextSlider, 500);
        })

        // 点击“图片”时事件处理
        this.swiperUl.addEventListener("click", function(e){
            that.throttle(that.handleClickImgs, 500, e);
        })

        // 点击“下方黑色按钮”时事件处理
        this.swiperSpots.addEventListener("click", function(e){
            that.throttle(that.handleClickDots, 500, e);
        })

        // 鼠标移入时进行处理
        this.swiperList.addEventListener("mouseenter", function(){
            that.stopPlay();
        })

        // 鼠标移出时进行处理
        this.swiperList.addEventListener("mouseleave", function(){
            that.stopPlay();
            that.autoPlay && that.handleAutoPlay();
        })
    },
    preSlider: function(){
        let len = this.imgArr.length + 1; // 处理无缝无限循环时在最后多加了一张照片
        this.curIndex--;
        if(this.curIndex == -1){
            this.swiperUl.style.transition = 'none';
            this.swiperUl.style.left = `${(len - 1) * -100}%`;
            setTimeout(() => {
                this.curIndex = len - 2;
                this.swiperUl.style.transition = '0.5s';
                this.swiperUl.style.left = `${(this.curIndex) * -100}%`;
            }, 0)
        }else{
            this.swiperUl.style.left = `${this.curIndex * -100}%`;
        }

        // 更新黑色按钮
        this.curIndex == -1? this.updateSpot(len - 2): this.updateSpot(this.curIndex);
        // timer && clearTimeout(timer);
    },
    nextSlider: function(){
        let len = this.imgArr.length + 1; // 处理无缝无限循环时在最后多加了一张照片
        this.curIndex++;
        this.swiperUl.style.left = `${this.curIndex * -100}%`;
        this.swiperUl.style.transition = `0.5s`;
        if(this.curIndex == len - 1){
            setTimeout(() => {
                this.curIndex = 0;
                this.swiperUl.style.transition = `none`;
                this.swiperUl.style.left = 0;
            }, 500) // 时间要大于等于动画过度的时间，即>=0.5s
        }

        // 更新黑色按钮
        this.curIndex == len - 1? this.updateSpot(0): this.updateSpot(this.curIndex);
        // timer && clearTimeout(timer);
    },
    updateSpot: function(index){
        let dots = document.getElementsByClassName("dot");
        for(let i = 0; i < dots.length; i++){
            if(i  == index){
                dots[i].style.backgroundColor = "cornflowerblue";
            }else{
                dots[i].style.backgroundColor = "black";
            }
        }
    },
    handleClickDots: function(e){
        let tag = e.target;
        this.curIndex = tag.getAttribute("index");
        if(this.curIndex){
            this.swiperUl.style.left = `${this.curIndex * -100}%`;
            // 更新黑色按钮样式
            this.updateSpot(this.curIndex)
        }
    },
    handleClickImgs: function(e){
        let tag = e.target;
        let index = tag.getAttribute("index");
        alert(`跳转至链接${this.imgArr[index].url}`)
    },
    // 自动播放
    handleAutoPlay: function(){
        let that = this;
        // 修改nextSlider中指针指向
        this.intervalTimer = setInterval(that.nextSlider.bind(that), that.intervalTime);
    },
    // 停止自动播放
    stopPlay: function(){
        clearInterval(this.intervalTimer);
    },
    // 节流
    throttle: function(fn, delay, val){
        let now = Date.now();
        if(now - this.preTime > delay){
            fn.call(this, val);
            this.preTime = Date.now();
        }
    }
}