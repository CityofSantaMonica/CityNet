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

$(document).ready(function () {
    var $timeline = $("#draggable-timeline");
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
});
