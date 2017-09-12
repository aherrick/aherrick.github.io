
function handleTweets(tweets) {

    var x = tweets.length;
    var n = 0;

    var twitter = $('#twitter');

    while (n < x) {

        twitter.append('<li>' + tweets[n] + '</li>');
        n++;
    }
}

$(function () {
    
    
    var smptweets = {
      "id": '354597188057325569',
      "domId": '',
      "maxTweets": 7,
      "enableLinks": true,
      "showUser": true,
      "showTime": true,
      "dateFunction": '',
      "showRetweet": false,
      "customCallback": handleTweets,
      "showInteraction": false
    };

    twitterFetcher.fetch(smptweets);
});


