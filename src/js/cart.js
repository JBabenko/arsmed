$(document).ready(function() {
  // Изменение количества товара для добавления в корзину
  $('.js-product-qty-btn').click(changeProductQty);
  $('.js-product-qty-input').on('keyup', productQtyWatcher);

  // Добавление товара в корзину
  $('.js-add-to-cart').click(addProductToCart);
  const itemInCart = getItemInCart($('.product-page__options-input').filter(':checked').attr('id'));
  setProductAddedQty(itemInCart && itemInCart.qty);
});

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
  const optionId = $('.js-product-option:checked').attr('id');
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
