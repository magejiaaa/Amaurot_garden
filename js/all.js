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