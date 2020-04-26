document.addEventListener('DOMContentLoaded', () => {
  const $productsMenu = document.querySelector('.products-menu');
  const $productsMenuTrigger = document.querySelector('.js-products-trigger');
  $productsMenuTrigger.addEventListener('click', clickProductsTrigger);

  window.addEventListener('click', (e) => {
    if ($productsMenu.classList.contains('products-menu_visible') && !e.target.closest('.products-menu') && !e.target.closest('.js-products-trigger')) {
      $productsMenu.classList.remove('products-menu_visible');
      $productsMenuTrigger.classList.remove('main-menu__item_active');
    }
  })
});

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

function clickProductsTrigger() {
  const $productsMenu = document.querySelector('.products-menu');
  const $productsMenuTrigger = document.querySelector('.js-products-trigger');
  $productsMenu.classList.toggle('products-menu_visible');
  $productsMenuTrigger.classList.toggle('main-menu__item_active');
};

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
