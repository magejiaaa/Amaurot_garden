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

    $(".hamburger1").click(function(){
        $(this).toggleClass("is-active");
    });
});