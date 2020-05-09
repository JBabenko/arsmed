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
  }); // Табы на странице товара

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

function setProductAddedQty($this, qty) {
  var $cartCount = $this.find('.js-product-cart-count');

  if (qty) {
    $cartCount.addClass('visible');
  } else {
    $cartCount.removeClass('visible');
  }

  $cartCount.text(qty || '');
}

;