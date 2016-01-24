$(function() {
    $(".nav__trigger").on('click touchend', function(e) {
        $(".nav").toggleClass("nav--open");
        e.preventDefault();
    });
});
