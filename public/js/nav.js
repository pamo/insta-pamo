$(function() {
    $(".nav__trigger").click(function(e) {
        $(".nav").toggleClass("nav--open");
        e.preventDefault();
    });
});
