document.addEventListener('DOMContentLoaded', () => {
  // Меню с каталогом продукции
  const $productsMenu = document.querySelector('.products-menu');
  if (window.innerWidth < 1024) {
    $productsMenu.classList.add('products-menu_m');
  }
  const $productsMenuTrigger = document.querySelector('.js-products-trigger');
  $productsMenuTrigger.addEventListener('click', toggleProductsMenu);

  const $header = document.querySelector('.header');
  const $expandMenuBtn = document.querySelector('.js-ham-btn');
  const $closeCatalogBtn = document.querySelector('.products-menu__close-btn');
  $expandMenuBtn.addEventListener('click', () => {
    $header.classList.toggle('header_expanded');
  });
  $closeCatalogBtn.addEventListener('click', () => {
    toggleProductsMenu();
  });

  window.addEventListener('click', (e) => {
    if ($productsMenu.classList.contains('products-menu_visible') && !e.target.closest('.products-menu') && !e.target.closest('.js-products-trigger')) {
      toggleProductsMenu();
    }

    if ($header.classList.contains('header_expanded') && !e.target.closest('.header') && !e.target.closest('.js-ham-btn')) {
      $header.classList.toggle('header_expanded');
      $expandMenuBtn.classList.toggle('active');
    }
  })

  $('.product-card__title-select').on('change', setProductValues);
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

function toggleProductsMenu() {
  const $header = document.querySelector('.header');
  const $productsMenu = document.querySelector('.products-menu');
  const $productsMenuTrigger = document.querySelector('.js-products-trigger');
  const $expandMenuBtn = document.querySelector('.js-ham-btn');

  $productsMenu.classList.toggle('products-menu_visible');
  $productsMenuTrigger.classList.toggle('main-menu__item_active');
  if (!$header.classList.contains('header_expanded')) {
    $expandMenuBtn.classList.toggle('active');
  }
  $header.classList.add('header_expanded');
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
