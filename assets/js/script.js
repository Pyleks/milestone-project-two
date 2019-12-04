var example = ['Experiment with colors', 'Walls do not hurt', 'Ready yet???', 'Remember to eat the apples'];

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

}