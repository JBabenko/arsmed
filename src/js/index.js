$(document).ready(function () {
  var t = document.querySelector(".products-menu").getBoundingClientRect().top;
  $(".products-menu-sub").css("top", t)

  $('.product-card__title-select').on('change', setProductValues);
});
var t = tns({
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
  t.pause()
}), $(".main-slider").on("mouseleave", function () {
  t.play()
});

function setProductValues(e) {
  const target = $(e.target);
  const option = $(this).find(`[value="${e.target.value}"]`);
  const img = target.parents('.product-card').find('.product-card__img');
  const pricePrimary = target.parents('.product-card').find('.product-card__price-primary');
  const priceSecondary = target.parents('.product-card').find('.product-card__price-secondary');
  img.attr('src', option.data('image'));
  pricePrimary.text(option.data('price-rub'));
  priceSecondary.text(e.target.value);
};
