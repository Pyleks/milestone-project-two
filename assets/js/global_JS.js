// Target the navbar to create a box when hoovering
$(document).ready(function() {
    $(".nav_link_style").mouseover(function () {
        $(this).addClass("target_border")
    });
    $(".nav_link_style").mouseleave(function () {
        $(this).removeClass("target_border")
    });
});