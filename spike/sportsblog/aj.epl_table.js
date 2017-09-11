
$(function () {

    var yql_query = 'select * from html where url="http://www.scorespro.com/soccer/england/premier-league/2014-2015/standings/"';
    yql_query += " and xpath='//*[@id=\"standings_1a\"]'";
    yql_query = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(yql_query) + '&format=html&callback=?';

    $.getJSON(yql_query, function (data) {

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

