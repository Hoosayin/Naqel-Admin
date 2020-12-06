$('#modal-sample').modal('show');
$('#modal-sample').modal('hide');

$(function () {
    var backToTop = $('.back-to-top'),
        threshold = 1 * $(window).height();

    // Displayed when we've scrolled 2x the viewport height
    if (backToTop.length === 0 ||
        $(document).height() < threshold) {
        return;
    }

    backToTop.affix({
        offset: {
            top: threshold
        }
    });

    // Smooth scroll to top
    backToTop.click(function () {
        $('html, body').animate({ scrollTop: 0 }, {
            duration: 750,
            easing: 'swing'
        });

        return false; // prevent default href
    });
});

$(function () {
    $("#slider").responsiveSlides({
        speed: 800
    });
});
$(function () {
    $("#event-slider").responsiveSlides({
        speed: 50
    });
});