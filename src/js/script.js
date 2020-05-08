document.addEventListener('DOMContentLoaded', () => {
  // Меню с каталогом продукции
  const $productsMenu = document.querySelector('.products-menu');

  const $productsMenuTrigger = document.querySelector('.js-products-trigger');
  $productsMenuTrigger.addEventListener('click', toggleProductsMenu);

  const $header = document.querySelector('.header');
  const $expandMenuBtn = $('.js-ham-btn');
  const $closeMenuBtn = document.querySelector('.js-close-menu');
  const $closeCatalogBtn = document.querySelector('.products-menu__close-btn');
  $expandMenuBtn.click(function() {
    $header.classList.toggle('header_expanded');
  });
  $closeMenuBtn.addEventListener('click', () => {
    $header.classList.toggle('header_expanded');
    $expandMenuBtn.toggleClass('active');
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
      $expandMenuBtn.toggleClass('active');
    }
  })

  $('.product-card__title-select').on('change', setProductCardValues);
  setProductPageValues();
  $('.product-page__options-input').on('change', setProductPageValues);

  // Табы на странице товара
  showActiveTabContent();
  $('.js-tabs').on('change', showActiveTabContent);
});

function toggleProductsMenu() {
  const $header = document.querySelector('.header');
  const $productsMenu = document.querySelector('.products-menu');
  const $productsMenuTrigger = document.querySelector('.js-products-trigger');
  const $expandMenuBtn = $('.js-ham-btn');

  $productsMenu.classList.toggle('products-menu_visible');
  $productsMenuTrigger.classList.toggle('main-menu__item_active');
  if (!$header.classList.contains('header_expanded')) {
    $expandMenuBtn.toggleClass('active');
  }
  $header.classList.add('header_expanded');
};

function setProductCardValues(e) {
  const target = $(e.target);
  const option = $(this).find(`[value="${e.target.value}"]`);
  const img = target.parents('.product-card').find('.product-card__img');
  const pricePrimary = target.parents('.product-card').find('.product-card__price-primary');
  const priceSecondary = target.parents('.product-card').find('.product-card__price-secondary');
  img.attr('src', option.data('image'));
  pricePrimary.text(option.data('price-rub'));
  priceSecondary.text(e.target.value);
};

function setProductPageValues() {
  const target = $('.product-page__options-input').filter(':checked');
  $('.js-price-primary').text(target.data('price-primary'));
  $('.js-price-secondary').text(target.data('price-secondary'));
  $('.product-page__img').attr('src', target.data('image'));
  const itemInCart = getItemInCart(target.attr('id'));
  setProductAddedQty(itemInCart && itemInCart.qty);
};

function showActiveTabContent() {
  const targetId = $('.js-tabs').filter(':checked').attr('id');
  const checkedContent = $('.js-tabs-content').filter(function() {
    return $(this).data('id') === +targetId;
  });

  $('.js-tabs-content').removeClass('product-page__tabs-content_active');
  checkedContent.addClass('product-page__tabs-content_active');
};

function getItemInCart(id) {
  const cart = JSON.parse(localStorage.getItem('itemsInCart')) || [];
  return cart.find(item => item.optionId === id);
};

function setProductAddedQty(qty) {
  if (qty) {
    $('.js-product-cart-count').addClass('product-page__add-count_visible');
  } else {
    $('.js-product-cart-count').removeClass('product-page__add-count_visible');
  }
  $('.js-product-cart-count').text(qty || '');
};
