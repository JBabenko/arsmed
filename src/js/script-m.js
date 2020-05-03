$(document).ready(function(){
  const catalog = $('.products-menu');

  for (let i = 0; i < 2; i++) {
    const menuIndex = i === 1 ? '' : i;
    const menuPostfix = i ? `-sub${menuIndex}` : '';
    const currentItems = catalog.find(`.products-menu${menuPostfix}__item-text`);

    currentItems.click(function() {
      if (!catalog.hasClass('products-menu_m')) {
        return;
      }
      const nextLevel = i ? i + 1 : '';
      const nextChild = $(this).parent().find(`.products-menu-sub${nextLevel}`);

      currentItems.removeClass('active');
      $(`.products-menu-sub${nextLevel}`).slideUp(300);

      if (!nextChild.is(':visible')) {
        $(this).addClass('active');
        nextChild.slideToggle(300);
      }
    });
  }

  $( window ).resize(function() {
    const windowWidth = window.innerWidth;
    if (windowWidth < 1024) {
      catalog.addClass('products-menu_m');
    } else {
      catalog.removeClass('products-menu_m');
      $('.products-menu-sub').removeAttr('style');
    }
  });
});
