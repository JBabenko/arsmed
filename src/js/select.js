$(document).ready(function() {
  $('.select').click(clickSelect);
  $('.select__input').change(changeOption);
  $('.select__list').each(function() {
    $(this).find('.select__input').first().change().attr('checked', 'checked');
  });
 
  function clickSelect() {
    const productContainer = $(this).closest('.js-product-container');

    if ($(this).hasClass('select_opened')) {
      $(this).removeClass('select_opened');

      if (productContainer.length) {
        productContainer.css('z-index', '');
      }
      return;
    }

    $('.select').removeClass('select_opened');
    $('.js-product-container').css('z-index', '');
    $(this).addClass('select_opened');

    if (productContainer.length) {
      productContainer.css('z-index', '2');
    }
  };

  $(document).mouseup(e => {
    if (!$('.select').is(e.target) && $('.select').has(e.target).length === 0) {
      $('.select').removeClass('select_opened');
      $('.js-product-container').css('z-index', '');
    }
  });

  function changeOption() {
    const productContainer = $(this).closest('.js-product-container');
    const optionText = $(this).data('text');
    const $container = $(this).closest('.select');
    $container.find('.select__text').text(optionText);
    $container.removeClass('select_opened');
    if (productContainer.length) {
      productContainer.css('z-index', '');
    }
  };

});
