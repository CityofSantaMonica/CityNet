$(document).ready(function() {
    $(".knob").knob({
        bgColor: "#DADADC",
        displayInput: false,
        min: 0,
        max: 100,
        readOnly: true,
        value: 0
    });

    $("#wavelengths-start").click(function() {
        var $this = $(this);
        
        if ($this.hasClass("disabled")) {
            return false;
        }
        
        $(".knob").each(function() {
            var $this = $(this);
            var target = $this.data("value");

            $({value: 0}).animate({value: target}, {
                duration: 1000,
                easing: 'swing',
                progress: function () {
                    $this.val(Math.ceil(this.value)).trigger('change')
                }
            });
        });

        $this.addClass("disabled");
        $(".service-wavelengths .time").addClass("animated");
    });
});