$(document).ready(function() {
  // Изменение количества товара для добавления в корзину
  $('.js-product-qty-btn').click(changeProductQty);
  $('.js-product-qty-input').on('keyup', productQtyWatcher);
  $('.js-product-option').on('change', setProductValues);
  setCartTotalCountText();

  // Добавление товара в корзину
  $('.js-product-container').each(function() {
    $(this).find('.js-add-to-cart').click(addProductToCart);
    const itemInCart = getItemInCart($(this).find('.js-product-option:checked').attr('id'));
    setProductAddedQty($(this), itemInCart && itemInCart.qty);
  });

  function setProductValues() {
    const $container = $(this).closest('.js-product-container');
    $container.find('.js-product-price-primary').text($(this).data('price-primary'));
    $container.find('.js-product-price-secondary').text($(this).data('price-secondary'));
    $container.find('.js-product-img').attr('src', $(this).data('image'));
    const itemInCart = getItemInCart($(this).attr('id'));
    setProductAddedQty($container, itemInCart && itemInCart.qty);
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
    const $container = $(this).closest('.js-product-container');
    const optionId = $container.find('.js-product-option:checked').attr('id');
    const qty = +$container.find('.js-product-qty-input').val() || 1;
  
    const cart = getCart();
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
    setProductAddedQty($container, newQty);
    setCartTotalCountText();
  };
  
  function getItemInCart(id) {
    const cart = getCart();
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

  function setCartTotalCountText() {
    const count = getCartTotalCount();
    if (count) {
      $('.js-cart-total-count-wrap').removeClass('hidden');
      $('.js-cart-total-count').text(count);
    } else {
      $('.js-cart-total-count-wrap').addClass('hidden');
    }
  };

  function getCartTotalCount() {
    const cart = getCart();
    return cart.reduce((acc, item) => acc += item.qty, 0);
  };

  function getCart() {
    return JSON.parse(localStorage.getItem('itemsInCart')) || [];
  };
});
