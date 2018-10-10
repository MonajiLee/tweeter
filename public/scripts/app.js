/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from tweets.json
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
];


// Task 3
$('form').on('submit', function(event) {
    event.preventDefault();
    let tweetInput = $(event.target).serialize();
    $.ajax("/tweets/", {method: 'POST', data: tweetInput}).then(() => {
        console.log("This is working");
    });
});

// Task 2 ----- renders tweets dynamically in relation to Task 1 -----
function renderTweets(tweetArr) {
    // loops through tweets (array of tweet objects)
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

renderTweets(data);