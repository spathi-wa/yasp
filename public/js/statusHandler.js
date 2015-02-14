var moment = require('moment');

module.exports = function() {
    var socket = io.connect();
    var buffers = {
        last_added: [],
        last_parsed: []
    };
    socket.on('stats', function(data) {
        console.log(data);
        for (var prop in data.stats) {
            if (typeof data.stats[prop] === "object") {
                $("#" + prop + " tbody").empty();
                for (var i = 0; i < data.stats[prop].length; i++) {
                    $(
                        "<tr>" +
                        "<td><a href='/matches/" + data.stats[prop][i].match_id + "'>" + data.stats[prop][i].match_id + "</a></td>" +
                        "<td class='fromNowAttr' time='" + (data.stats[prop][i].start_time + data.stats[prop][i].duration) + "'></td>" +
                        "</tr>").appendTo($("#" + prop + " tbody"));
                }
                /*
                if (!buffers[prop].length || data.stats[prop].match_id !== buffers[prop][0].match_id) {
                    data.stats[prop].jq = $(
                        "<tr>" +
                        "<td><a href='/matches/" + data.stats[prop].match_id + "'>" + data.stats[prop].match_id + "</a></td>" +
                        "<td class='fromNowAttr' time='"+(data.stats[prop].start_time + data.stats[prop].duration)+"'></td>" +
                        "</tr>");
                    buffers[prop].unshift(data.stats[prop]);
                    data.stats[prop].jq.hide().prependTo($("#" + prop + " tbody")).show('slow');
                }
                if (buffers[prop].length > 10) {
                    var pop = buffers[prop].pop();
                    pop.jq.hide('slow', function() {
                        pop.jq.remove();
                    });
                }
                */
                //recompute times
                $(".fromNowAttr").each(function() {
                    $(this).text(moment.unix($(this).attr("time")).fromNow());
                });
            }
            else {
                $("#" + prop).html(data.stats[prop]);
            }
        }
    });
};