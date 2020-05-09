$(document).ready(function() {
  $('.select').click(clickSelect);
  $('.select__input').change(changeOption);
});

function clickSelect() {
  if ($(this).hasClass('select_opened')) {
    $(this).removeClass('select_opened');
    return;
  }
  $('.select').removeClass('select_opened');
  $(this).addClass('select_opened');
};

$(document).mouseup(e => {
  if (!$('.select').is(e.target) && $('.select').has(e.target).length === 0) {
    $('.select').removeClass('select_opened');
  }
});

function changeOption() {
  const optionText = $(this).data('text');
  const $container = $(this).closest('.select');
  $container.find('.select__text').text(optionText);
  $container.removeClass('select_opened');
};
