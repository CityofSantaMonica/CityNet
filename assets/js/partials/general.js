$(document).ready(function () {
    var $main = $("main");
    
    $main.removeClass("js-disabled");
    $main.addClass("js-enabled");

    var hash = window.location.hash;

    if (hash) {
        $('ul.nav a[href="' + hash + '"]').tab('show');
    }

    $('.nav-tabs a').click(function (e) {
        $(this).tab('show');
        var scrollmem = $('body').scrollTop();
        window.location.hash = '';
        $('html,body').scrollTop(scrollmem);
    });

    $('a[href^="#"]:not(.js-noSmoothScroll)').scrollToAnchor();

    // Bootstrap Carousel
    $('.carousel').carousel({
        interval: 10000
    });

    // Bootstrap Tabs
    $('#ServicesTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
});