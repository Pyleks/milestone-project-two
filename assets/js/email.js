function sendMail(contactForm) {
    emailjs.init("user_qeOnqYBPzVybZ4G2BOqsg");
    var templateParams = {
        "first_name": contactForm.firstname.value,
        "last_name": contactForm.lastname.value,
        "from_email": contactForm.emailaddress.value,
        "Blockworm_feedback": contactForm.feedback.value
    };
    emailjs.send("gmail", "blockworm_feedback", templateParams)
        .then(
            function(response) {
                console.log("SUCCESS", response);
            },
            function(error) {
                console.log("FAILED", error);
            }
        );
    return false;  // To block from loading a new page
}