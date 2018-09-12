
var $oul=$('.ulBox');
var $listBox=$('.listBox');
/*
* 轮播图
* */
function bannerFn() {
    var mySwiper = new Swiper ('.bannerBox', {
        autoplay:{
            disableOnInteraction:true,  //手动划过之后，自动播放默认不动，改为false，就会继续自动
            delay:1000  //在当前窗口的停留时间
        },
        loop: true,//是否无缝滚动
        pagination: { //分页器
            el: '.pageBox',  //分页器的盒子
            type: 'fraction',  //分页器的类型
            // type: 'bullets',
            //type : 'progressbar',
            //type : 'custom',
            currentClass:'currentPage',  //变动数字的 盒子的类名
            totalClass:'totalPage'  //总共数字 盒子的类名

        },

    });
}

/*
* 获取数据
* */
/*$.ajax({
type:'get',  //请求方式
    url:'data/banner.json', //请求路径
    data:{t:123,q:234},  //发送给后台的数据
    success:function (d) { //请求成功之后执行的函数
        console.log(d);
        givehtml(d);
    },
    error:function () {//请求失败之后执行的函数

    }
});*/
//把数据转成页面可见的元素
function givehtml(data) {
    data=data||[];
    var str='';//存储 拼接好的 结构字符串
    data.forEach((item)=>{
        str+=`<li class="swiper-slide">
                    <a href="##">
                        <img src="${item.img}" alt="">
                        <div>${item.title}</div>
                    </a>
                </li>`
    });
    $oul.html(str);
    // bannerFn();
}
//先请求数据  再把数据放到页面上，再执行轮播图函数

/*
* promise 写法
* */
var p=new Promise(function (resolve, reject) {
    $.ajax({
        type:'get',
        url:'data/banner.json',
        success:function (data) {
            resolve(data)
        },
        error:function (res) {
            reject(res)
        }
    })
});
// p.then(function (data) {
//     //第一个参数 是promise执行的成功的函数
//     // console.log(data);
//     givehtml(data);
//     return data;
// },function () {
//     //第一个参数 是promise执行的失败的函数
// }).then(function (data) {
//    bannerFn();
// },function (data) {
//
// });

p.then(function (data) {
    //第一个参数 是promise执行的成功的函数
    // console.log(data);
    givehtml(data);
    return data;
},function () {
    //第一个参数 是promise执行的失败的函数
}).then(function (data) {
    bannerFn();
}).catch(function (data) {
    console.log(res);
});
/*
* 新闻列表部分
* */
var listPro = new Promise(function (resolve, reject) {
    $.ajax({
        type:'post',
        url:'data/list.json',
        data:{t:1},
        success:function (data) {
            resolve(data)
        },
        error:function (res) {
            reject(res)
        }
    })
});

function giveListHtml(data) {
    data=data||[];
    var str='';
    data.forEach((item)=>{
        switch(item.type){
            case 0://第一个无图片结构
                str+=` <a href="##">
            <div class="text_box">
                <p>${item.title}</p>
                <div class="comment_box">
                    <em class="">
                        <span class="">${item.num}</span>
                        <span class="icon_com"></span>
                    </em>
                </div>
            </div>
        </a>`;
                break;
            case 1://一张图的结构
                 str+=`<a href="##">
            <div class="img_Box">
                <img src="${item.img}" alt="">
            </div>
            <div class="text_box">
                <p>${item.title}</p>
                <div class="comment_box">
                    <em class="">
                        <span class="">${item.num}</span>
                        <span class="icon_com"></span>
                    </em>
                </div>

            </div>
        </a>` ;
                 break;
            case 3://三张图的结构
                str+=` <a class="three_box" href="##">
            <p>${item.title}</p>
            <div class="three_pic">
                <div>
                    <img src="${item.img[0]}" alt="">
                </div>
               <div>
                   <img src="${item.img[1]}" alt="">
               </div>
                <div>
                    <img src="${item.img[2]}" alt="">
                </div>

            </div>
            <div class="comment_box">
                <em class="">
                    <span class="">${item.num}</span>
                    <span class="icon_com"></span>
                </em>
            </div>
        </a>`;
                break;
        }
    });
    $listBox.html(str);
}
listPro.then(function (data) {
    giveListHtml(data);
});