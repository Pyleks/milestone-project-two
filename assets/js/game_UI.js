$(document).ready(function() {
    $("a").mouseover(function () {
        $(this).addClass("target_border")
    });

    $("a").mouseleave(function () {
        $(this).removeClass("target_border")

    });
});