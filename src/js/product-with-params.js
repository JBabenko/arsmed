"use strict";

$(document).ready(function () {
  $('.js-product-param-value').change(function() {
    const parentId = $(this).data('id');
    const currentParamBlock = $(this).closest('.js-product-param');

    currentParamBlock.find('.js-product-param-value').prop("checked", false);
    $(this).prop('checked', true);
    currentParamBlock.find('.js-product-param').hide();
    const nextParamBlock = $(`*[data-parent-param='${parentId}']`)
    nextParamBlock.show();
  })
  $('.product-params__param-wrapper').first().show();
});
