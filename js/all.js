$(document).ready(function () {
    $(".menulist").find(".dropdown").on({
        mouseenter: function () {
            //stuff to do on mouse enter
            $(this).find(".dropdown-menu").addClass("show")
        },
        mouseleave: function () {
            //stuff to do on mouse leave
            $(this).find(".dropdown-menu").removeClass("show")
        }
    });

    //漢堡選單樣式
    $(".hamburger1").click(function(){
        $(this).toggleClass("is-active");
    });
    //圖片滑鼠移入放大
    $(".imagebig").find("img:not(.imgnoJq").on({
        mouseenter: function () {
            //stuff to do on mouse enter
            $(this).removeClass("imagebigback")
            $(this).attr("max-height", "100%")
        },
        mouseleave: function () {
            //stuff to do on mouse leave
            $(this).removeAttr("max-height")
            $(this).addClass("imagebigback")
        }
    });
    //這啥 但跟滑鼠移入移出有關
    $(".codeclip").on({
        mouseenter: function () {
            //stuff to do on mouse enter
            $(this).find("button").addClass("clipicon_show")
        },
        mouseleave: function () {
            //stuff to do on mouse leave
            $(this).find("button").removeClass("clipicon_show")
        }
    });
    //試做次選單不要超出footer
    $(window).scroll(function() {
        if ($(document).scrollTop() >= $(document).height() - $(window).height()- $(".footer").outerHeight(true)) {
            $(".secondmenu").css("padding-bottom", "260px");
        }
        else {
            $(".secondmenu").css("padding-bottom", "60px");
        }
    });
    //表格自動編號
    $(document).ready(function(){
        $(".a").each(function(index){
            $(this).html(index+1,index++); 
        });
    })
});

// 剪貼簿
function myFunction() {
    /* Get the text field */
    var copyText = document.getElementById("myInput");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
}

function myFunction2() {
    /* Get the text field */
    var copyText = document.getElementById("myInput2");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
}



//LAZYLOAD
const selector = ".lazyload";
const dataSrc = "data-src";
//觀察器參數
const observerConfig = {
    root: null,
    rootMargin: '0px',
    threshold: [0]
};

const callback = function(entries, selfObserver) {
    //有方法的陣列 entries=call出來的參數
    Array.prototype.forEach.call(entries, function (entry) {
        //是否進入畫面
        if (entry.isIntersecting) {
            selfObserver.unobserve(entry.target);
            // 取得 data-src 之前藏放的圖片連結資料
            let src = entry.target.getAttribute(dataSrc);
            if ("img" === entry.target.tagName.toLowerCase()) {
                if (src) {
                    // 改放入到 img src 終讓頁面可以讀取
                    entry.target.src = src;
                }
                entry.target.style.display = "none";
            };
            entry.target.onload = function () {
                //呼叫img同層的前一個元素
                entry.target.previousElementSibling.style.display = "none";
                //圖片載入完成前不要出來==
                entry.target.style.display = "";
            }
        }
    });
};

let $images = document.querySelectorAll(selector);
//觀察器建立
let observer = new IntersectionObserver(callback, observerConfig);
Array.prototype.forEach.call($images, function (image) {
    observer.observe(image);
});