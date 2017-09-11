$(function () {

    twitterFetcher.fetch('354597188057325569', '', 7, true, true, true, '', true, handleTweets);
});


function handleTweets(tweets) {

    var x = tweets.length;
    var n = 0;

    var twitter = $('#twitter');

    while (n < x) {

        twitter.append('<li>' + tweets[n] + '</li>');
        n++;
    }
}
