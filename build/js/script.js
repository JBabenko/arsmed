"use strict";function g(e){var s=e&&$(e.target),t=$(".header"),a=$(".products-menu"),n=$(".js-products-trigger"),c=$(".js-ham-btn");if(a.toggleClass("products-menu_visible"),n.toggleClass("main-menu__item_active"),t.hasClass("header_expanded")){if(s&&s.closest(".header").length&&(!$(".menu-background:visible").length||!a.hasClass("products-menu_visible")))return $(".menu-background").fadeToggle(200),void t.removeClass("header_expanded")}else c.toggleClass("active"),$(".menu-background").fadeToggle(200);t.addClass("header_expanded")}function h(){var e=$(this).attr("id"),s=$(".js-tabs-content").filter(function(){return $(this).data("id")===+e});$(".js-tabs-content").removeClass("product-page__tabs-content_active"),s.addClass("product-page__tabs-content_active")}$(document).ready(function(){var a=$(".products-menu");$(".js-products-trigger").click(g);var t=$(".header"),n=$(".js-ham-btn"),e=$(".js-close-menu"),s=$(".products-menu__close-btn");n.click(function(){t.toggleClass("header_expanded"),$(".menu-background").fadeToggle(200)}),e.click(function(){t.toggleClass("header_expanded"),n.toggleClass("active"),$(".menu-background").fadeToggle(200)}),s.click(function(){g()}),$(window).click(function(e){var s=$(e.target);!a.hasClass("products-menu_visible")||s.closest(".products-menu").length||s.closest(".js-products-trigger").length||g(e),!t.hasClass("header_expanded")||s.closest(".header").length||s.closest(".js-ham-btn").length||(t.removeClass("header_expanded"),n.toggleClass("active"),$(".menu-background").fadeOut(200)),$(".main-top_search").length&&!s.closest(".main-top").length&&u()});for(var c=function(t){var e=t?"-sub".concat(1===t?"":t):"";a.find(".js-menu".concat(e,"-expand-trigger")).click(function(){var e=t?t+1:"",s=$(this).closest(".js-products-menu-item").find(".products-menu-sub".concat(e));$(this).toggleClass("active"),s.slideToggle(300)})},o=0;o<2;o++)c(o);$(".header-m").find(".js-ham-btn").attr("width",48),$(".js-tabs").on("change",h).first().change().attr("checked","checked");var r=$(".js-main-top"),d=$(".js-search-btn"),i=$(".js-search-input"),l=$(".js-search-close-btn");function u(){r.removeClass("main-top_search"),i.val("")}d.on("click",function(){r.addClass("main-top_search"),i.focus()}),l.on("click",u)});