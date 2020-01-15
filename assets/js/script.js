// Stores the player nickname in local storage to be used in the game
// When the player have typed in a username and clicked Play
$(document).ready(function(){
    ($("#playButton").click(function() {
        let myName = $("input").val();
        // Check for condition if Nickname is too long
        if(myName.length > 8) {
            console.log("Too much");
            $(".max_chara_display").css("color", "yellow");
            $(".max_chara_display").text("Maximum 8 Characters");

            // Check for condition if Nickname has been written
        }else if(myName.length <= 0) {
            $(".max_chara_display").text("Type in a Nickname");
            $(".max_chara_display").css("color", "yellow");
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

    // Rotates through an array to display different fact to users on landing page.
    let example = ['Each "apple" is different', 'Walls do not hurt', 'Ready yet???', 'Remember to eat the "apples"'];

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