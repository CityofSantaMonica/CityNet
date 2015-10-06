$(document).ready(function () {
    $("#monitors-start").click(function () {
        $(".monitor-screen").addClass("animated");
        $(".monitor-container .time").addClass("animated");

        $(this).addClass("disabled");
    });
});