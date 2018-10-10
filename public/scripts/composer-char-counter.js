$(document).ready(function() {
    $("textarea").keyup(function() {
        let counterElem = $(this).siblings()[1];
        let countdown = $(counterElem).text(140 - this.value.length);

        if ($(counterElem).text() < 0) {
            $(countdown).addClass("zero");
        } else {
            $(countdown).removeClass("zero");
        }
    })
});
