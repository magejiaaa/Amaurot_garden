$(document).ready(function () {
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
});


    //表格自動編號
    // window.onload = function () {
    //     const tableLine = $(id='number');
    //     for (let i = 0; i < tableLine.row.length; i++) {
    //         tableLine.rows[i].cells[0].innerHTML = (i + 1);
    //     }
    // }

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