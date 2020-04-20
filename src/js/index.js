$(document).ready(function(){
  const menuTop = document.querySelector('.products-menu').getBoundingClientRect().top;
  const subMenus = $('.products-menu-sub');

  subMenus.css('top', menuTop);
});

const slider = tns({
  container: '.main-slider__list',
  items: 1,
  speed: 500,
  autoplay: true,
  autoplayTimeout: 4000,
  autoplayButtonOutput: false,
  controls: true,
  controlsContainer: '.main-slider__controls',
  nextButton: '.main-slider__controls-btn_next',
  prevButton: '.main-slider__controls-btn_prev',
  loop: true,
  nav: false,
  mouseDrag: true,
});

$('.main-slider').on('mouseenter', function(){
  slider.pause();
});
$('.main-slider').on('mouseleave', function(){
  slider.play();
});
