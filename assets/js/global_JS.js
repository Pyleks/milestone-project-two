// Target the navbar to create a green box when hoovering
$(document).ready(function() {
    $(".nav_link_style").mouseover(function () {
        $(this).addClass("target_border")
    });
    // When removing the mouse cursor the green box go away
    $(".nav_link_style").mouseleave(function () {
        $(this).removeClass("target_border")
    });
});