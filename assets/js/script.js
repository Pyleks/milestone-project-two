// Stores the player nickname in localstoreage to be used in the game
$(document).ready(function(){
    $("#playButton").click(function() {
        let myName = $("input").val();
        localStorage.setItem("favoriteName", myName);
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