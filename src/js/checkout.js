"use strict";

$(document).ready(function () {
  getProductsInCart();
  $(".js-checkout-form").submit(submitCheckoutForm);
  
function submitCheckoutForm(e) {
  e.preventDefault();

  const cart = getCart();
  const form = {
    name: $(this).find('#name').val(),
    phone: $(this).find('#phone').val(),
    email: $(this).find('#email').val(),
    comment: $(this).find('#comment').val(),
  };

  $.ajax({
    type: "POST",
    url: "/api/send-order/",
    data: { form, cart },
    beforeSend: function() {
      $('.checkout__submit').attr('disabled', 'disabled');
      $('.js-sending-order-loader').show();
     },
    success: () => {
      localStorage.removeItem('itemsInCart');
      setCartTotalCountText();
      $('.checkout-page').html('<div class="checkout-page__success-message">Заказ успешно отправлен! Скоро с Вами свяжется менеджер</div>');
    },
    complete: function(){
      $('.js-sending-order-loader').hide();
    },
  });
}

function getProductsInCart() {
  var cart = localStorage.getItem('itemsInCart') || [];
  if (!cart.length) {
    $('.cart__empty').show();
    return;
  }

  $.ajax({
    type: "POST",
    url: "/api/cart/",
    data: { cart },
    beforeSend: function() {
     $('.js-cart-loader').show();
    },
    success: (res) => {
      const resCart = JSON.parse(res);
      resCart.forEach((item) => {
        const $cartItem = $.parseHTML($('#cart-item').html().trim());

        $($cartItem).data('id', item.optionId || item.id);

        $($cartItem).find('.cart-item__picture')
                    .attr('href', item.url)
                    .find('.cart-item__picture-img')
                    .attr('src', item.image)
                    .attr('alt', `${item.title} ${item.optionTitle}`);
        
        $($cartItem).find('.cart-item__name')
                    .text(`${item.title || ''} ${item.optionTitle || ''}`.trim())
                    .attr('href', item.url);

        $($cartItem).find('.cart-qty__input')
                    .val( getItemQty(item.optionId || item.id) )
                    .on('input', changeQtyInCart)
                    .on('input', productQtyWatcher);

        $($cartItem).find('.cart-qty__btn').click(changeProductQty).click(changeQtyInCart);

        $($cartItem).find('.cart-item__delete-btn').click(onClickDelete);

        $('.cart').append($cartItem);
      });
    },
    complete: function(){
      $('.js-cart-loader').hide();
    },
  });
};

function getItemInCart(id) {
  const cart = getCart();
  return cart.find(cartItem => +cartItem.optionId === id || cartItem.id === id);
};

function getItemQty(id) {
  const item = getItemInCart(id);
  return item ? item.qty : null;
};

function changeQtyInCart() {
  const cart = getCart();
  const newVal = +$(this).closest('.cart-item').find('.cart-qty__input').val();
  const itemId = $(this).closest('.cart-item').data('id');
  const itemInCart = getItemInCart(itemId);

  itemInCart.qty = newVal;
  const newCart = cart.map((item) => {
    if (+item.optionId === itemId || item.id === itemId) {
      return itemInCart;
    }

    return item;
  });
  
  localStorage.setItem('itemsInCart', JSON.stringify(newCart));
  setCartTotalCountText();
};

function onClickDelete() {
  if (!confirm('Удаление товара из корзины')) return;

  const cart = getCart();
  const itemId = $(this).closest('.cart-item').data('id');

  const idx = cart.findIndex(item => +item.optionId === itemId || item.id === itemId);
  cart.splice(idx, 1);

  localStorage.setItem('itemsInCart', JSON.stringify(cart));
  $(this).closest('.cart-item').remove();
  setCartTotalCountText();
  $('.cart__empty').show();
};

function getCart() {
  return JSON.parse(localStorage.getItem('itemsInCart')) || [];
}

function productQtyWatcher(e) {
  e.target.value = e.target.value.replace(/\D/gi, '').replace(/^0+/, '');

  if (!e.target.value) {
    e.target.value = 1;
  }
}

;

function changeProductQty() {
  var action = +$(this).data('action');
  var input = $(this).siblings('.js-product-qty-input');
  var value = +input.val();
  input.val(value + action);

  if (+input.val() < 1) {
    input.val(1);
  }
}

;

function setCartTotalCountText() {
  var count = getCartTotalCount();

  if (count) {
    $('.js-cart-total-count-wrap').removeClass('hidden');
    $('.js-cart-total-count').text(count);
  } else {
    $('.js-cart-total-count-wrap').addClass('hidden');
  }
}

;

function getCartTotalCount() {
  var cart = getCart();
  return cart.reduce(function (acc, item) {
    return acc += item.qty;
  }, 0);
}

;

});
