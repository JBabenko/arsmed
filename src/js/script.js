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

  $('.product-card__title-select').on('change', setProductCardValues);
  setProductPageValues();
  $('.product-page__options-input').on('change', setProductPageValues);

  // Табы на странице товара
  showActiveTabContent();
  $('.js-tabs').on('change', showActiveTabContent);

  // Изменение количества товара для добавления в корзину
  $('.js-product-qty-btn').click(changeProductQty);
  $('.js-product-qty-input').on('keyup', productQtyWatcher);

  // Добавление товара в корзину
  $('.js-add-to-cart').click(addProductToCart);
  const itemInCart = getItemInCart($('.product-page__options-input').filter(':checked').attr('id'));
  setProductAddedQty(itemInCart && itemInCart.qty);
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

function changeProductQty() {
  const action = +$(this).data('action');
  const input = $('.js-product-qty-input');
  const value = +input.val();

  input.val(value + action);

  if (+input.val() < 1) {
    input.val(1);
  }
};

function productQtyWatcher(e) {
  e.target.value = e.target.value.replace(/\D/gi, '').replace(/^0+/, '');
  if (!e.target.value) {
    e.target.value = 1;
  }
};

function addProductToCart() {
  const id = $(this).data('id');
  const optionId = $(this).closest('.product-page__params')
                          .find('.js-product-option:checked')
                          .attr('id');
  const qty = +$('.js-product-qty-input').val() || 1;

  const cart = JSON.parse(localStorage.getItem('itemsInCart')) || [];
  const itemInCart = cart.find(item => item.optionId === optionId);
  let newQty;

  if (itemInCart) {
    itemInCart.qty += qty;
    newQty = itemInCart.qty;
  } else {
    cart.push({ id, qty, optionId });
    newQty = qty;
  }

  localStorage.setItem('itemsInCart', JSON.stringify(cart));
  setProductAddedQty(newQty);
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
