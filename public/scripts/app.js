$(() => {


// Task 4 --- create AJAX GET request from the server
function loadTweets(tweetDatabase) {
    $.ajax({
        url:'/tweets',
        method:'GET',
        success: function(result){
            renderTweets(result);
        }
    });
}



// Task 3 --- creates AJAX POST request to the server ---
$('form').on('submit', function(event) {
    event.preventDefault();
    let tweetInput = $(event.target).serialize();
    $.ajax("/tweets/", {
        method: 'POST', 
        data: tweetInput 
    }).then(() => {
    });
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

loadTweets();
});
