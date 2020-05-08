"use strict";

document.addEventListener('DOMContentLoaded', function () {
  // Меню с каталогом продукции
  var $productsMenu = document.querySelector('.products-menu');
  var $productsMenuTrigger = document.querySelector('.js-products-trigger');
  $productsMenuTrigger.addEventListener('click', toggleProductsMenu);
  var $header = document.querySelector('.header');
  var $expandMenuBtn = $('.js-ham-btn');
  var $closeMenuBtn = document.querySelector('.js-close-menu');
  var $closeCatalogBtn = document.querySelector('.products-menu__close-btn');
  $expandMenuBtn.click(function () {
    $header.classList.toggle('header_expanded');
  });
  $closeMenuBtn.addEventListener('click', function () {
    $header.classList.toggle('header_expanded');
    $expandMenuBtn.toggleClass('active');
  });
  $closeCatalogBtn.addEventListener('click', function () {
    toggleProductsMenu();
  });
  window.addEventListener('click', function (e) {
    if ($productsMenu.classList.contains('products-menu_visible') && !e.target.closest('.products-menu') && !e.target.closest('.js-products-trigger')) {
      toggleProductsMenu();
    }

    if ($header.classList.contains('header_expanded') && !e.target.closest('.header') && !e.target.closest('.js-ham-btn')) {
      $header.classList.toggle('header_expanded');
      $expandMenuBtn.toggleClass('active');
    }
  });
  $('.product-card__title-select').on('change', setProductCardValues);
  setProductPageValues();
  $('.product-page__options-input').on('change', setProductPageValues); // Табы на странице товара

  showActiveTabContent();
  $('.js-tabs').on('change', showActiveTabContent);
});

function toggleProductsMenu() {
  var $header = document.querySelector('.header');
  var $productsMenu = document.querySelector('.products-menu');
  var $productsMenuTrigger = document.querySelector('.js-products-trigger');
  var $expandMenuBtn = $('.js-ham-btn');
  $productsMenu.classList.toggle('products-menu_visible');
  $productsMenuTrigger.classList.toggle('main-menu__item_active');

  if (!$header.classList.contains('header_expanded')) {
    $expandMenuBtn.toggleClass('active');
  }

  $header.classList.add('header_expanded');
}

;

function setProductCardValues(e) {
  var target = $(e.target);
  var option = $(this).find("[value=\"".concat(e.target.value, "\"]"));
  var img = target.parents('.product-card').find('.product-card__img');
  var pricePrimary = target.parents('.product-card').find('.product-card__price-primary');
  var priceSecondary = target.parents('.product-card').find('.product-card__price-secondary');
  img.attr('src', option.data('image'));
  pricePrimary.text(option.data('price-rub'));
  priceSecondary.text(e.target.value);
}

;

function setProductPageValues() {
  var target = $('.product-page__options-input').filter(':checked');
  $('.js-price-primary').text(target.data('price-primary'));
  $('.js-price-secondary').text(target.data('price-secondary'));
  $('.product-page__img').attr('src', target.data('image'));
  var itemInCart = getItemInCart(target.attr('id'));
  setProductAddedQty(itemInCart && itemInCart.qty);
}

;

function showActiveTabContent() {
  var targetId = $('.js-tabs').filter(':checked').attr('id');
  var checkedContent = $('.js-tabs-content').filter(function () {
    return $(this).data('id') === +targetId;
  });
  $('.js-tabs-content').removeClass('product-page__tabs-content_active');
  checkedContent.addClass('product-page__tabs-content_active');
}

;

function getItemInCart(id) {
  var cart = JSON.parse(localStorage.getItem('itemsInCart')) || [];
  return cart.find(function (item) {
    return item.optionId === id;
  });
}

;

function setProductAddedQty(qty) {
  if (qty) {
    $('.js-product-cart-count').addClass('product-page__add-count_visible');
  } else {
    $('.js-product-cart-count').removeClass('product-page__add-count_visible');
  }

  $('.js-product-cart-count').text(qty || '');
}

;