var openYear = -1;
var openEvent = -1;

function closePreviousYear () {
    var $target = $("#timeline-theater-" + openYear);
    $target.slideToggle('slow');
}

function animateTheater (eID, year, content) {
    var switchingYears = (openYear !== year);
    var theater = "#timeline-theater-" + year;
    var $target = $(theater);
    var $actor  = $(theater + " .c-year__theater__actor");

    if (switchingYears) {
        closePreviousYear();
    }
  
    if (eID !== openEvent) {
        if ($target.is(':visible')) {
            $target.slideToggle('slow', function () {
                $actor.html(content);
            }).slideToggle('slow');
        }
        else {
            $actor.html(content);
            $target.slideToggle("slow");
        }
    }

    openYear = year;
    openEvent = eID;
}

$(document).ready(function () {
    $(".c-year__event__header").click(function () {
        var $parent = $(this).parent();
        var eID = $parent.data("id");
        var year = $parent.data("year");
        var content = $parent.find(".c-year__event__desc").html();

        animateTheater(eID, year, content);
    });
});