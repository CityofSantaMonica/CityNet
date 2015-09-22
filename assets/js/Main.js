var YouTubePlayers = []; // An array to store all of the YT.Player objects for easy access
var actor = null;        // The current YouTube video that's playing
var onStage = false;     // Whether or not the theatre is active

function timelineMobileResize(eventObj) {
    var eventLabel = eventObj.find("label")[0];
        eventLabel.click();
}

function getMaxTimelineMovement() {
    var timelineMaxWidth = 0;
    var $window = $(document);

    $('#timeline > *').each(function () { timelineMaxWidth += $(this).width(); });

    return (timelineMaxWidth - $window.width()) * -1;
}

function draggableTimeline() {
    var $timeline = $("#draggable-timeline");
    var $window = $(document);

    $timeline.css("left", getMaxTimelineMovement() + "px");

    if ($window.width() >= 992) {
        if (typeof $timeline.draggable("instance") === "undefined") {
            $timeline.draggable({
                axis: "x",
                drag: function (event, ui) {
                    // Prevent dragging past the far left
                    if (ui.position.left > 0) {
                        ui.position.left = 0;
                    }

                    // Prevent dragging past the far right
                    if (ui.position.left < getMaxTimelineMovement()) {
                        ui.position.left = getMaxTimelineMovement();
                    }
                },
                scrollSensitivity: 1000
            });
        }
        else {
            $timeline.draggable("enable");
        }
        
    }
    else {
        if (typeof $timeline.draggable("instance") !== "undefined") {
            $timeline.draggable("disable");
        }
    }
}

function closeVideo(videoID) {
    YouTubePlayers["player-" + videoID].pauseVideo();

    if (typeof (actor) !== "undefined" && actor.getPlayerState() === YT.PlayerState.PLAYING) {
        actor.pauseVideo();
    }

    $("#yt-" + videoID).removeClass("visible");
    $('.carousel').carousel('cycle');
    $("body").removeClass("noScroll");

    onStage = false;
}

function loadYouTubePlayers() {
    $(".js-ytplayer").each(function () {
        var dataID = $(this).data("ytid");
        var jQueryID = "player-" + dataID;

        YouTubePlayers[jQueryID] = new YT.Player(jQueryID, {
            videoId: dataID
        });
    });
}

window.onYouTubeIframeAPIReady = function () {
    loadYouTubePlayers();
}

$(document).ready(function () {
    var $body = $("body");
    var $main = $("main");
    var $timeline = $("#draggable-timeline");

    $main.removeClass("js-disabled");
    $main.addClass("js-enabled");

    var hash = window.location.hash;

    if (hash)
    {
        $('ul.nav a[href="' + hash + '"]').tab('show');
    }

    $('.nav-tabs a').click(function (e) {
        $(this).tab('show');
        var scrollmem = $('body').scrollTop();
        window.location.hash = '';
        $('html,body').scrollTop(scrollmem);
    });

    $('a[href^="#"]:not(.js-noSmoothScroll)').scrollToAnchor();

    // Only make Jumbotube run on desktops
    if ($(document).width() >= 992) {
        $('#jumbotube').jumbotube({
            videoID: 'KR30gxH_Dj4',
            onApiReady: loadYouTubePlayers
        });
    }
    
    // YouTube players weren't loaded because Jumbotube wasn't used
    if (YouTubePlayers.length == 0)
    {
        // Load YouTube's JS API
        var tag = document.createElement('script');
        tag.src = "//www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    var parentPos = $('#History').offset();
    var childPos = $timeline.offset();

    $(".c-timeline__work__content").click(function () {
        timelineMobileResize($(this).parent());
    });

    // Setup our timeline to be draggable
    draggableTimeline();

    $(".timelineControl").click(function () {
        var $this = $(this);
        var direction = $this.data("direction");
        var currentPosition = $timeline.css("left");
        var newPosition = 0;
        var distanceMoved = 400;

        if (direction === "left") {
            newPosition = parseInt(currentPosition) + distanceMoved;
        }

        if (direction === "right") {
            newPosition = parseInt(currentPosition) - distanceMoved;
        }

        if (newPosition <= 0 && newPosition > getMaxTimelineMovement()) {
            $timeline.animate({ left: newPosition }, 400);
        }
        else if (newPosition > 0) {
            $timeline.animate({ left: 0 }, 400);
        }
        else if (newPosition < getMaxTimelineMovement()) {
            $timeline.animate({ left: getMaxTimelineMovement() }, 400);
        }
    });

    $(window).resize(function () {
        draggableTimeline();
    });

    // Bootstrap Carousel
    $('.carousel').carousel({
        interval: 10000
    });

    // Bootstrap Tabs
    $('#ServicesTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    // Youtube Popup
    $(".youtube-player").click(function () {
        var dataID = $(this).data('ytid');

        $("#yt-" + dataID).addClass("visible");
        $('.carousel').carousel('pause');

        actor = YouTubePlayers["player-" + dataID];
        actor.playVideo();

        $body.addClass("noScroll");

        onStage = true;
    });

    $(".theatre-exit").click(function () {
        var dataID = $(this).data('ytid');

        closeVideo(dataID);
    });
});

$(document).keyup(function(e) {
    // When escape is pressed, hide the stage; esc key maps to keycode `27`
    if (e.keyCode === 27) {
        if (onStage) {
            var actorURL = actor.getVideoUrl();
            var match = actorURL.match(/[?&]v=([^&]+)/);
            var dataID = match[1];

            closeVideo(dataID);
        }
    }
});

jQuery.fn.scrollToAnchor = function (settings) {
    settings = jQuery.extend({
        speed: 1100
    }, settings);

    return this.each(function () {
        var caller = this;

        $(caller).click(function (event) {
            event.preventDefault();

            var elementClick = $(caller).attr("href");
            var destination = $(elementClick).offset().top;

            $("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination }, settings.speed, function () {
                window.location.hash = elementClick;
            });

            return false;
        });
    });
};