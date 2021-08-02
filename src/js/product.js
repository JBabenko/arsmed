"use strict";

$(document).ready(function () {
  // Изменение количества товара для добавления в корзину
  $('.js-product-qty-btn').click(changeProductQty);
  $('.js-product-qty-input').on('keyup', productQtyWatcher);
  $('.js-product-option').on('change', setProductValues);
  setCartTotalCountText(); // Добавление товара в корзину

  $('.js-product-container').each(function () {
    $(this).find('.js-add-to-cart').click(addProductToCart);
    var itemInCart = getItemInCart($(this).find('.js-product-option:checked').attr('id'));
    setProductAddedQty($(this), itemInCart && itemInCart.qty);

    if (!$(this).find('.js-product-option').length && !$(this).find('.js-product-price-primary').text().trim()) {
      $(this).find('.js-product-price-primary').text('Цену уточняйте');
      $(this).find('.js-currency-icon:visible').hide();
      $(this).find('.js-product-price-secondary:visible').hide();
    }
  });
  $('.product-page__options').find('.js-product-option').first().change().attr('checked', 'checked');

  const productId = $('.js-product-with-params');

  $.ajax({
    type: "POST",
    url: "/api/product-params/",
    data: { productId },
    beforeSend: function() {
    //  $('.js-cart-loader').show();
    },
    success: (res) => {
      console.log(res);
    },
    complete: function(){
      // $('.js-cart-loader').hide();
    },
  });

  function setProductValues() {
    var $container = $(this).closest('.js-product-container');

    if (!$(this).data('price-primary')) {
      $container.find('.js-product-price-primary').text('Цену уточняйте');
      $container.find('.js-currency-icon:visible').hide();
      $container.find('.js-product-price-secondary:visible').hide();
    } else {
      $container.find('.js-product-price-primary').text($(this).data('price-primary'));
      $container.find('.js-product-price-secondary').text($(this).data('price-secondary'));
      $container.find('.js-product-img').attr('src', $(this).data('image'));

      $container.find('.js-currency-icon:hidden').show();
      $container.find('.js-product-price-secondary:hidden').show();
    }
    
    var itemInCart = getItemInCart($(this).attr('id'));
    setProductAddedQty($container, itemInCart && itemInCart.qty);
    
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
  
  function productQtyWatcher(e) {
    e.target.value = e.target.value.replace(/\D/gi, '').replace(/^0+/, '');
  
    if (!e.target.value) {
      e.target.value = 1;
    }
  }
  
  ;
  
  function addProductToCart() {
    var id = $(this).data('id');
    var $container = $(this).closest('.js-product-container');
    var optionId = $container.find('.js-product-option:checked').attr('id');
    var qty = +$container.find('.js-product-qty-input').val() || 1;
    var cart = getCart();
    var itemInCart = cart.find(function (item) {
      return item.optionId
        ? item.optionId === optionId
        : item.id === id;
    });
    var newQty;
  
    if (itemInCart) {
      itemInCart.qty += qty;
      newQty = itemInCart.qty;
    } else {
      cart.push({
        id: id,
        qty: qty,
        optionId: optionId
      });
      newQty = qty;
    }
  
    localStorage.setItem('itemsInCart', JSON.stringify(cart));
    setProductAddedQty($container, newQty);
    setCartTotalCountText();
  }
  
  ;
  
  function getItemInCart(id) {
    var cart = getCart();
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
  
  function getCart() {
    return JSON.parse(localStorage.getItem('itemsInCart')) || [];
  }
  
  ;
});
