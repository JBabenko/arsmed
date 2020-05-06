$(document).ready(function() {
  var slider = tns({
    container: ".main-slider__list",
    items: 1,
    speed: 500,
    autoplay: !0,
    autoplayTimeout: 4e3,
    autoplayButtonOutput: !1,
    controls: !0,
    controlsContainer: ".main-slider__controls",
    nextButton: ".main-slider__controls-btn_next",
    prevButton: ".main-slider__controls-btn_prev",
    loop: !0,
    nav: !1,
    mouseDrag: !0
  });
  $(".main-slider").on("mouseenter", function () {
    slider.pause()
  }), $(".main-slider").on("mouseleave", function () {
    slider.play()
  });
});