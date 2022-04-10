let index = 0;
let images = document.getElementsByClassName("images")[0]
let cloneFirstNode = images.firstElementChild.cloneNode();
// window.getComputedStyle(images.firstElementChild).getPropertyValue("background-image") 获取节点的内联和外联样式
cloneFirstNode.style.backgroundImage = window.getComputedStyle(images.firstElementChild).getPropertyValue("background-image");
images.appendChild(cloneFirstNode);


let img = document.getElementsByClassName("img")
let timer; // 全局存储计时器
let intervalTimer;
let lock = true; // 节流用

// 点击“<”时事件处理
document.getElementById("prev").onclick = function(){
    if(!lock) return;
    index--;
    if(index == -1){
        images.style.transition = 'none';
        images.style.left = `${(img.length - 1) * -100}%`;
        setTimeout(() => {
            index = img.length - 2;
            images.style.transition = '0.5s';
            images.style.left = `${(index) * -100}%`;
        }, 0)
    }else{
        images.style.left = `${index * -100}%`;
    }

    // 更新黑色按钮
    index == -1? updateSpot(img.length - 2): updateSpot(index);
    timer && clearTimeout(timer);

    // 节流
    lock = false;
    setTimeout(() => {
        lock = true;
    }, 1500)
}

// 点击“>”时事件处理
function handleRightBtn(){
    if(!lock) return;
    index++;
    images.style.left = `${index * -100}%`;
    images.style.transition = `0.5s`;
    if(index == img.length - 1){
        setTimeout(() => {
            index = 0;
            images.style.transition = `none`;
            images.style.left = 0;
        }, 500) // 时间要大于等于动画过度的时间，即>=0.5s
    }

    // 更新黑色按钮
    index == img.length - 1? updateSpot(0): updateSpot(index);
    timer && clearTimeout(timer);

    // 节流
    lock = false;
    setTimeout(() => {
        lock = true;
    }, 1500)
}
// 点击“>”时事件处理
document.getElementById("next").onclick = function(){
    handleRightBtn();
}

// 更新黑点样式
function updateSpot(index){
    let dots = document.getElementsByClassName("dot");
    for(let i = 0; i < dots.length; i++){
        if(i  == index){
            dots[i].style.backgroundColor = "cornflowerblue";
        }else{
            dots[i].style.backgroundColor = "black";
        }
    }
}

// 点击“下方黑色按钮”时事件处理
document.getElementById("dots").addEventListener("click", function(e){
    let tag = e.target;
    let curIndex = tag.getAttribute("index");
    if(curIndex){
        index = curIndex - 1; // 修改全局的index
        images.style.left = `${index * -100}%`;
        // 更新黑色按钮样式
        updateSpot(index)
    }
})

// 自动播放
function autoPlay(){
    lock = true;
    intervalTimer = setInterval(handleRightBtn, 1500);
}

// 停止自动播放
function stopPlay(){
    clearInterval(intervalTimer);
}

// 鼠标移入时进行处理
document.getElementById("container").addEventListener("mouseenter", function(){
    stopPlay();
})

// 鼠标移出时进行处理
document.getElementById("container").addEventListener("mouseleave", function(){
    stopPlay();
    autoPlay();
})