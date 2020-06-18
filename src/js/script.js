$(document).ready(function () {
  // Меню с каталогом продукции
  const $productsMenu = $('.products-menu');
  const $productsMenuTrigger = $('.js-products-trigger');
  $productsMenuTrigger.click(toggleProductsMenu);

  const $header = $('.header');
  const $expandMenuBtn = $('.js-ham-btn');
  const $closeMenuBtn = $('.js-close-menu');
  const $closeCatalogBtn = $('.products-menu__close-btn');
  $expandMenuBtn.click(function() {
    $header.toggleClass('header_expanded');
    $('.menu-background').fadeToggle(200);
  });
  $closeMenuBtn.click(function() {
    $header.toggleClass('header_expanded');
    $expandMenuBtn.toggleClass('active');
    $('.menu-background').fadeToggle(200);
  });
  $closeCatalogBtn.click(function() {
    toggleProductsMenu();
  });

  $(window).click(function(e) {
    const target = $(e.target);

    if ($productsMenu.hasClass('products-menu_visible') && !target.closest('.products-menu').length && !target.closest('.js-products-trigger').length) {
      toggleProductsMenu(e);
    }

    if ($header.hasClass('header_expanded') && !target.closest('.header').length && !target.closest('.js-ham-btn').length) {
      $header.removeClass('header_expanded');
      $expandMenuBtn.toggleClass('active');
      $('.menu-background').fadeOut(200);
    }
  })

  // Меню продукции
  for (let i = 0; i < 2; i++) {
    const menuIndex = i === 1 ? '' : i;
    const menuPostfix = i ? `-sub${menuIndex}` : '';
    const currentItems = $productsMenu.find(`.js-menu${menuPostfix}-expand-trigger`);

    currentItems.click(function() {
      const nextLevel = i ? i + 1 : '';
      const nextChild = $(this).closest('.js-products-menu-item').find(`.products-menu-sub${nextLevel}`);

      $(this).toggleClass('active');
      nextChild.slideToggle(300);
    });
  }

  $('.header-m').find('.js-ham-btn').attr('width', 48);

  // Табы на странице товара
  $('.js-tabs').on('change', showActiveTabContent).first().change().attr('checked', 'checked');
});

function toggleProductsMenu(e) {
  const target = e && $(e.target);

  const $header = $('.header');
  const $productsMenu = $('.products-menu');
  const $productsMenuTrigger = $('.js-products-trigger');
  const $expandMenuBtn = $('.js-ham-btn');

  $productsMenu.toggleClass('products-menu_visible');
  $productsMenuTrigger.toggleClass('main-menu__item_active');

  if (!$header.hasClass('header_expanded')) {
    $expandMenuBtn.toggleClass('active');
    $('.menu-background').fadeToggle(200);
  } else if (target && target.closest('.header').length && (!$('.menu-background:visible').length || !$productsMenu.hasClass('products-menu_visible'))) {
    $('.menu-background').fadeToggle(200);
    $header.removeClass('header_expanded');
    return;
  }

  $header.addClass('header_expanded');
};

function showActiveTabContent() {
  const targetId = $(this).attr('id');
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

function setProductAddedQty($this, qty) {
  const $cartCount = $this.find('.js-product-cart-count');

  if (qty) {
    $cartCount.addClass('visible');
  } else {
    $cartCount.removeClass('visible');
  }

  $cartCount.text(qty || '');
};
