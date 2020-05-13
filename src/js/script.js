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

  // Табы на странице товара
  $('.js-tabs').on('change', showActiveTabContent).first().change().attr('checked', 'checked');
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
