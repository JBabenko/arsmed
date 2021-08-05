"use strict";

$(document).ready(function () {
  clearProductValues();

  $('.js-product-param-value').change(function() {
    const article = $(this).data('article');
    const pricePrimary = $(this).data('price-primary');
    const priceSecondary = $(this).data('price-secondary');
    const optionId = $(this).data('option-id');
    const isLastParam = Boolean(article) && Boolean(pricePrimary) && Boolean(optionId);

    $('.products-table__row').removeClass('products-table__row_selected');
    
    if (isLastParam) {
      setProductValues({ article, pricePrimary, priceSecondary, optionId });
    } else {
      clearProductValues();
    }

    const parentId = $(this).data('id');
    const $currentParamBlock = $(this).closest('.js-product-param');

    $currentParamBlock.find('.js-product-param-value').prop("checked", false);
    $(this).prop('checked', true);
    $currentParamBlock.find('.js-product-param').hide();
    const nextParamBlock = $(`*[data-parent-param='${parentId}']`)
    nextParamBlock.show();
  })
  $('.js-product-param').first().show();


  function setProductValues({ article, pricePrimary, priceSecondary, optionId }) {
    var $container = $('.js-product-with-params-container');

    $container.find('.js-product-article').text(article);
    $container.find('.js-product-price-primary').text(pricePrimary);
    $container.find('.js-product-price-secondary').text(priceSecondary);

    $container.find('.js-product-values:hidden').show().attr('data-option-id', optionId);
    $container.find('.js-product-article:hidden').show();
    $container.find('.js-currency-icon:hidden').show();
    $container.find('.js-product-price-secondary:hidden').show();

    const $itemInTable = $('.js-product-table').find(`*[data-option-id='${optionId}']`);
    $itemInTable.addClass('products-table__row_selected');
  }

  function clearProductValues() {
    var $container = $('.js-product-with-params-container');

    $container.find('.js-product-price-primary').text('Выберите параметры');
    $container.find('.js-product-values:visible').hide();
    $container.find('.js-currency-icon:visible').hide();
    $container.find('.js-product-price-secondary:visible').hide();
    $container.find('.js-product-article:visible').hide();
  }
});
