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