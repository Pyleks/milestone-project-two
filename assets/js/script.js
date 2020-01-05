// Stores the player nickname in local storage to be used in the game
$(document).ready(function(){
    ($("#playButton").click(function() {
        let myName = $("input").val();
        // Check for condition if Nickname is too long
        if(myName.length > 8) {
            console.log("Too much");
            $(".display_under").css("color", "yellow");
            $(".display_under").text("Maximum 8 Characters");

            // Check for condition if Nickname has been written
        }else if(myName.length <= 0) {
            $(".display_under").text("Type in a Nickname");
            $(".display_under").css("color", "yellow");
            // If passes check it get stored and transferred to the next page.
        }else {
            localStorage.setItem("favoriteName", myName);
            console.log(myName);
            window.location.href = 'game.html';
        }
    }));
    // Avoid page from refreshing when clicking enter
    $('form').keydown(function(event) {
        return event.keyCode != 13;

    });

    // Rotates through an array to display different rules to users on landing page.
    let example = ['Experiment with colors', 'Walls do hurt', 'Ready yet???', 'Remember to eat the apples'];

    textSequence(0);
    function textSequence(i) {

        if (example.length > i) {
            setTimeout(function() {
                document.getElementById("slideshow").innerHTML = example[i];
                textSequence(++i);
            }, 2000); // 2 seconds (in milliseconds)

        } else if (example.length == i) { // Loop
            textSequence(0);
        }

    }

});