
// --- create AJAX GET request from the server --- //
function loadTweets() {
    $.ajax({
        url:'/tweets',
        method:'GET',
        success: function(result) {
            renderTweets(result.reverse());
        }
    });
}

// --- creates AJAX POST request to the server --- //
$('form').on('submit', function(event) {
    event.preventDefault();
    let tweetInput = $(event.target).serialize();
    let tweetContent = $("textarea[name=text]").val();
    $('label').slideDown();

    if (tweetContent.length === 0) {
        $('label').text("Please fill in the text box with something to squeek.");
        return;
    } else if (tweetContent.length > 140) {
        $('label').text("Sorry, your squeek can only be 140 characters max.");
        return;
    } else {
        $('label').slideUp();
        $.ajax("/tweets/", {
            method: 'POST', 
            data: tweetInput,
            success: function(result) {
                loadTweets(result) }
        }).then(() => {
            $("textarea[name=text]").val("");
            $(".counter").text(140);
        })
    }
});

// --- 'Compose' button animation --- //
$('button').on('click', function(event) {
    $('.new-tweet').slideToggle();
    $('textarea').focus().select();
});

// --- new tweet shows up without refreshing the page --- //
// --- renders tweets dynamically in relation to Task 1 --- //
function renderTweets(tweetArr) {
    $('#tweets-container').empty();
    tweetArr.forEach(function(element){
        $(createTweetElement(element)).appendTo("#tweets-container");
    });
}

// --- creates tweet and returns HTML structure --- //
function createTweetElement(tweetObj) {
    let $tweet = $("<article>")
        .addClass("tweet");
    let $profilePicture = $("<img>")
        .attr("src", tweetObj.user.avatars.regular)
        .addClass("avatar");
    let $userhandle = $("<p>")
        .append(tweetObj.user.handle);
    let $username = $("<header>")
        .append(tweetObj.user.name)
        .append($profilePicture)
        .append($userhandle);
    let $message = $("<div>")
        .text(tweetObj.content.text);
    let $date = $("<footer>")
        .append(moment(tweetObj.created_at).fromNow());
    let $icons = $("<footer>")
        .append("<i class='far fa-flag'></i>")
        .append("<i class='fas fa-retweet'></i>")
        .append("<i class='far fa-heart'></i>");

    return $tweet
        .append($username)
        .append($message)
        .append($date)
        .append($icons);
}

loadTweets();