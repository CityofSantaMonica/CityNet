$(document).ready(function () {
    $("#monitors-start").click(function () {
        $(".service-broadband .monitor-screen").addClass("animated");
        $(".service-broadband .fadein-animation").addClass("animated");

        $(this).addClass("disabled");
    });
});