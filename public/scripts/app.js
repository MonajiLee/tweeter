// Task 4 --- create AJAX GET request from the server
function loadTweets() {
    $.ajax({
        url:'/tweets',
        method:'GET',
        success: function(result){
            renderTweets(result);
        }
    });
}

loadTweets();

// Task 3 --- creates AJAX POST request to the server ---
$('form').on('submit', function(event) {
    event.preventDefault();
    let tweetInput = $(event.target).serialize();
    let tweetContent = $("textarea[name=text]").val();

    if (tweetContent.length === 0) {
        alert("Oops! We couldn't find anything to tweet.");
        return;
    } else if (tweetContent.length > 140) {
        alert("Sorry, your tweet can only be 140 characters max.");
        return;
    } else {
        $.ajax("/tweets/", {
            method: 'POST', 
            data: tweetInput 
        }).then(() => {
            $("textarea[name=text]").val("");
        })
    }
});

// Task 2 ----- renders tweets dynamically in relation to Task 1 -----
function renderTweets(tweetArr) {
    $.each(tweetArr, function(index, value) {
        $(createTweetElement(value)).appendTo("#tweets-container");
    })
}

// Task 1 ----- creates tweet and returns HTML structure ---------
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
        .append(tweetObj.content.text);
    let $date = $("<footer>")
        .append(tweetObj.created_at);

    return $tweet
        .append($username)
        .append($message)
        .append($date);
}
