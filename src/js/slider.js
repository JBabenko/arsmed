$(document).ready(function() {
  var slider = tns({
    container: ".main-slider__list",
    items: 1,
    speed: 500,
    autoplay: !0,
    autoplayTimeout: 4e3,
    autoplayButtonOutput: !1,
    controls: !1,
    navContainer: ".main-slider__nav",
    loop: !0,
    nav: !0,
    mouseDrag: !0
  });
  $(".main-slider").on("mouseenter", function () {
    slider.pause()
  }), $(".main-slider").on("mouseleave", function () {
    slider.play()
  });
});