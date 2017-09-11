
$(function () {

    
    //https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20htmlstring%20where%20url%3D%22http%3A%2F%2Fwww.scorespro.com%2Fsoccer%2Fengland%2Fpremier-league%2F2014-2015%2Fstandings%2F%22%20and%20xpath%3D%27%2F%2F*%5B%40id%3D%22standings_1a%22%5D%27&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=
    // https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20htmlstring
    //%20where%20url%3D'http%3A%2F%2Fstackoverflow.com%2F'&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=

    var yql_query = 'select * from htmlstring where url="https://www.scorespro.com/soccer/england/premier-league/2017-2018/standings/"';
    yql_query += " and xpath='//*[@id=\"standings_1a\"]'";
    yql_query = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(yql_query) + '&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?';

    $.getJSON(yql_query, function (data) {

        console.log(data);
        var eplTableBody = $('#epl_table tbody');

        $(data.results[0]).find('tbody').each(function (i, tbody) {

            var row = $(tbody).find('tr');

            var club = $.trim(row.find('td:nth-child(2)').text());
            var clubFormat = $.trim(row.find('td:nth-child(2)').text()).toLowerCase().replace(/ /g, '-');
            var pts = $.trim(row.find('td:nth-child(3)').text());
            var wins = $.trim(row.find('td:nth-child(5)').text());
            var draws = $.trim(row.find('td:nth-child(6)').text());
            var losses = $.trim(row.find('td:nth-child(7)').text());
            var goalsdiff = $.trim(row.find('td:nth-child(9)').text());

            $('#epl_logos').append('<div class="' + clubFormat + '"></div>');


            //               <th>Club</th>
            //               <th>Pts</th>
            //               <th>W</th>
            //               <th>D</th>
            //               <th>L</th>
            //               <th>Goals</th>
            //               <th>GD</th>

            var bplTableRow = '<tr>';
            bplTableRow += '<td>' + club + '</td>';
            bplTableRow += '<td>' + pts + '</td>';
            bplTableRow += '<td>' + wins + '</td>';
            bplTableRow += '<td>' + draws + '</td>';
            bplTableRow += '<td>' + losses + '</td>';
            bplTableRow += '<td>' + goalsdiff + '</td>';
            bplTableRow += '</tr>';

            eplTableBody.append(bplTableRow);
        });
    });
});

