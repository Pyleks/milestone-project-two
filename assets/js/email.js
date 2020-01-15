// This code is partial from the mailJS tutorial in Code Institute.
// First section only link to the elements in the template in mailJS.
function sendMail(contactForm) {
    emailjs.init("user_qeOnqYBPzVybZ4G2BOqsg");
    var templateParams = {
        "first_name": contactForm.firstname.value,
        "last_name": contactForm.lastname.value,
        "from_email": contactForm.emailaddress.value,
        "Blockworm_feedback": contactForm.feedback.value
    };
    // Sends the email through mailJS
    // Also makes the button responsive when clicked, if success the button will changed text
    // And become green
    emailjs.send("gmail", "blockworm_feedback", templateParams)
        .then(
            function(response) {
                if(response) {
                    $(".feedback_button").text("Thank you");
                    $(".feedback_button").removeClass("btn-secondary");
                    $(".feedback_button").addClass("white_cl");
                    $(".feedback_button").addClass("dark_green_bg");
                }
            },
            // Change the color of button to red, with "Try Again Later"
            function(error) {
                if(error) {
                    $(".feedback_button").text("Try Again Later");
                    $(".feedback_button").removeClass("btn-secondary");
                    $(".feedback_button").addClass("white_cl");
                    $(".feedback_button").addClass("red_bg");
                }
            }
        );
    return false;  // To block from loading a new page

}