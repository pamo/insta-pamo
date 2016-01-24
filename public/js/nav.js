$(function() {
    $(".nav__trigger").on('click touchend', function(e) {
        var navElement = $(".nav");
        navElement.toggleClass("nav--open");
        if(navElement.hasClass("nav--open")) {
            navElement.removeAttr("aria-hidden");
        } else {
            navElement.attr("aria-hidden", true);
        }
        e.preventDefault();
    });
});
