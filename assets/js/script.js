$(document).ready(function(){
    $("#playButton").on("click", function(){
        let myName = $("input").val();
        localStorage.setItem("favoriteName", myName);
    });

    $(".nav_link_style").mouseover(function(){
        $(this).addClass("target_border")
    });
    $(".nav_link_style").mouseleave(function(){
        $(this).removeClass("target_border")
    });


var example = ['Experiment with colors', 'Walls do hurt', 'Ready yet???', 'Remember to eat the apples'];

textSequence(0);
function textSequence(i) {

    if (example.length > i) {
        setTimeout(function() {
            document.getElementById("slideshow").innerHTML = example[i];
            textSequence(++i);
        }, 2000); // 1 second (in milliseconds)

    } else if (example.length == i) { // Loop
        textSequence(0);
    }

}});
