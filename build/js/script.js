"use strict";function o(e){var t=e&&$(e.target),s=$(".header"),a=$(".products-menu"),n=$(".js-products-trigger"),c=$(".js-ham-btn");if(a.toggleClass("products-menu_visible"),n.toggleClass("main-menu__item_active"),s.hasClass("header_expanded")){if(t&&t.closest(".header").length&&(!$(".menu-background:visible").length||!a.hasClass("products-menu_visible")))return $(".menu-background").fadeToggle(200),void s.removeClass("header_expanded")}else c.toggleClass("active"),$(".menu-background").fadeToggle(200);s.addClass("header_expanded")}function r(){var e=$(this).attr("id"),t=$(".js-tabs-content").filter(function(){return $(this).data("id")===+e});$(".js-tabs-content").removeClass("product-page__tabs-content_active"),t.addClass("product-page__tabs-content_active")}$(document).ready(function(){var a=$(".products-menu");$(".js-products-trigger").click(o);var s=$(".header"),n=$(".js-ham-btn"),e=$(".js-close-menu"),t=$(".products-menu__close-btn");n.click(function(){s.toggleClass("header_expanded"),$(".menu-background").fadeToggle(200)}),e.click(function(){s.toggleClass("header_expanded"),n.toggleClass("active"),$(".menu-background").fadeToggle(200)}),t.click(function(){o()}),$(window).click(function(e){var t=$(e.target);!a.hasClass("products-menu_visible")||t.closest(".products-menu").length||t.closest(".js-products-trigger").length||o(e),!s.hasClass("header_expanded")||t.closest(".header").length||t.closest(".js-ham-btn").length||(s.removeClass("header_expanded"),n.toggleClass("active"),$(".menu-background").fadeOut(200))});for(var c=function(s){var e=s?"-sub".concat(1===s?"":s):"";a.find(".js-menu".concat(e,"-expand-trigger")).click(function(){var e=s?s+1:"",t=$(this).closest(".js-products-menu-item").find(".products-menu-sub".concat(e));$(this).toggleClass("active"),t.slideToggle(300)})},d=0;d<2;d++)c(d);$(".header-m").find(".js-ham-btn").attr("width",48),$(".js-tabs").on("change",r).first().change().attr("checked","checked")});