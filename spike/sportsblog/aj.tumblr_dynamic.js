var AJTumblrDynamic = new function () {

    var tags = {};
    var archive = {};
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    this.pollTumblr = function (offset) {


        var parms = {
            api_key: 'vSeVTJdzB437VS8HhGperGimTZoi3VfwKtdHSDH0ZpLNpnk5My',
            offset: offset || 0,
            limit: 20
        };

        var tumblrHandle = 'sundaymorningpint';

        $.ajax({

            url: 'http://api.tumblr.com/v2/blog/' + tumblrHandle + '.tumblr.com/posts',
            data: parms,
            dataType: 'jsonp',
            success: function (data) {

                $.each(data.response.posts, function () {

                    var datesplit = this.date.split(' ')[0].split('-');

                    var year = datesplit[0];
                    var monthNum = datesplit[1];

                    var yearMonthKey = year + ' ' + monthNum;
                    var yearMonthCache = archive[yearMonthKey];
                    if (yearMonthCache === undefined) {

                        archive[yearMonthKey] = 1;
                    }
                    else {

                        archive[yearMonthKey] = yearMonthCache + 1;
                    }

                    // handle tags

                    $.each(this.tags, function (i, tag) {

                        tag = tag.toLowerCase();
                        var tagcached = tags[tag];
                        if (tagcached === undefined) {

                            tags[tag] = 1;
                        }
                        else {

                            tags[tag] = tagcached + 1;
                        }

                    });
                });

                if (parms.offset + 20 < data.response.total_posts) {

                    parms.offset = parms.offset + 20;
                    AJTumblrDynamic.pollTumblr(parms.offset);
                }
                else {

                    //       loop over each property in the object and output!


                    var archiveElm = $('#archive');
                    for (var key in sortObj(archive, true, sortByMonthYearDate)) {

                        var yearMonth = key.split(' ');
                        var year = yearMonth[0];
                        var monthNum = parseInt(yearMonth[1]);
                        var month = monthNames[monthNum - 1];

                        var prettyDate = year + ' ' + month;

                        archiveElm.append('<li><a href="http://sundaymorningpint.tumblr.com/archive/' + year + '/' + monthNum + '">' + prettyDate + '</a> x ' + archive[key] + '</li>');
                    }

                    var tagsElm = $('#tags');
                    tags = sortObjByValue(tags, true);
                    for (var i = 0; i < tags.length; i++) {

                        tagsElm.append('<li><a href="http://sundaymorningpint.tumblr.com/tagged/' + tags[i].key + '">' + tags[i].key + '</a> x ' + tags[i].value + '</li>');
                    }

                    var monthsBack = new Date().getMonth();

                    $('#archive li:gt(' + monthsBack + ')').hide().last().after(

                          $('<a />').attr('href', '#').text('show more').click(function () {

                              var a = this;
                              $('#archive li:not(:visible):lt(12)').fadeIn(function () {

                                  if ($('#archive li:not(:visible)').length == 0) {

                                      $(a).remove();
                                  }
                              });

                              return false;
                          })
                          );

                    $('#tags li:gt(10)').hide().last().after(

                            $('<a />').attr('href', '#').text('show more').click(function () {

                                var a = this;
                                $('#tags li:not(:visible):lt(11)').fadeIn(function () {

                                    if ($('#tags li:not(:visible)').length == 0) {

                                        $(a).remove();
                                    }
                                });

                                return false;
                            })
                            );
                }
            }
        });
    }
};


$(function () {

    AJTumblrDynamic.pollTumblr();
});

function sortByMonthYearDate(a, b) {

    var as = a.split(' '),
        bs = b.split(' '),
        ad = new Date(as[0] + ' ' + as[1]),
        bd = new Date(bs[0] + ' ' + bs[1]);

    return ad.getTime() - bd.getTime();
}

function sortObj(arr, sortDesc, customSortFn) {
    // Setup Arrays
    var sortedKeys = new Array();
    var sortedObj = {};

    // Separate keys and sort them
    for (var i in arr) {
        sortedKeys.push(i);
    }

    // if we have a custom sort, get it!
    if (customSortFn) {
        sortedKeys.sort(customSortFn);
    }
    else {
        sortedKeys.sort();
    }

    if (sortDesc)
        sortedKeys = sortedKeys.reverse();

    // Reconstruct sorted obj based on keys
    for (var i in sortedKeys) {
        sortedObj[sortedKeys[i]] = arr[sortedKeys[i]];
    }
    return sortedObj;
}


function sortObjByValue(obj, sortDesc) {
    var arr = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'key': prop,
                'value': obj[prop]
            });
        }
    }
    arr.sort(function (a, b) { return a.value - b.value; });


    if (sortDesc)
        arr = arr.reverse();
    return arr; // returns array
}

$(function () {

    handleAuthor();
});


function handleAuthor() {

    var authors = [];

    authors['msav235'] = {
        name: 'Matt Savage',
        handle: 'msav235',
        profileImg: 'https://pbs.twimg.com/profile_images/588891052490100736/pGyNS-5n.jpg'
    };

    authors['jbpatton'] = {
        name: 'Jack Patton',
        handle: 'jbpatton',
        profileImg: 'https://pbs.twimg.com/profile_images/494673351583866880/oLsdaeby.jpeg'
    };

    authors['ryanbimmer'] = {
        name: 'Ryan Paul',
        handle: 'ryanbimmer',
        profileImg: 'https://pbs.twimg.com/profile_images/2240561379/r9uNif1V'
    };


    $('.post_author').each(function () {

        var elm = $(this);

        var handle = elm.parent().find('.post_author_twitterhandle');

        var handleText = '';
        if (handle) {
            handleText = handle.text();
        }

        var author;
        if (handleText in authors) {
            author = authors[handleText.toLowerCase()];
        }
        else {
            author = authors['msav235'];
        }

        var attribution = '<img alt="' + author.name + '" src="' + author.profileImg + '">';

        attribution += '<div class="post_author_name"><a href="http://twitter.com/' + author.handle + '">' + author.name + '</a></div>';

        attribution += '<iframe allowtransparency="true" frameborder="0" scrolling="no" src="//platform.twitter.com/widgets/follow_button.html?screen_name=' + author.handle + '"></iframe>';

        elm.html(attribution);
    });


}
