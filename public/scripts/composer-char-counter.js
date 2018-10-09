$(document).ready(function() {
    $("textarea").keyup(function() {
        let counterElem = $(this).siblings()[1];
        $(counterElem).text(140 - this.value.length);
    })
});
