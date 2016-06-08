var YouTubePlayers = []; // An array to store all of the YT.Player objects for easy access
var actor = null;        // The current YouTube video that's playing
var onStage = false;     // Whether or not the theatre is active

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

	// Only make Jumbotube run on desktops
    if ($(document).width() >= 992) {
        $('#jumbotube').jumbotube({
            videoID: 'KR30gxH_Dj4',
            onApiReady: loadYouTubePlayers
        });
    }

    // YouTube players weren't loaded because Jumbotube wasn't used
    if (YouTubePlayers.length === 0)
    {
        // Load YouTube's JS API
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

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
