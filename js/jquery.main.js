$(document).ready(function() {
	picturefill();
    initFixedScrollBlock();
    initTabNav();
    scrollUp();
    $(".main-carousel").owlCarousel({
        navigation : true,
        slideSpeed : 600,
        pagination : true,
        paginationSpeed : 300,
        singleItem:true,
        autoPlay: 5000,
        stopOnHover: true
    });
     $(".works-carousel").owlCarousel({ 
        navigation : true,
        slideSpeed : 800,
        pagination : true,
        paginationSpeed : 400,
        items : 4,
    });
});
// "tab" key handling
function initTabNav() {
    jQuery('.nav').tabNav({
        items: 'li'
    });
}

function picturefill(){
	document.createElement( "picture" );
};

function initFixedScrollBlock(){
    $(window).scroll(function(){
      var sticky = $('.sticky'),
          scroll = $(window).scrollTop();

      if (scroll >= 50) sticky.addClass('fixed');
      else sticky.removeClass('fixed');
    });
};

jQuery('[data-toggle="dropdown"]').each(function() {
    var item = jQuery(this),
        parent = item.parent();
  
    parent.one('mousemove', function() {
        parent.hover(function() {
            parent.addClass('open');
        }, function() {
            parent.removeClass('open');
        }).trigger('mouseover');
    });
});
function scrollUp(){
    $(document).ready(function(){
    $("#back-top").hide();
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) {
                $('#back-top').fadeIn();
            } else {
                $('#back-top').fadeOut();
            }
        });
        $('#back-top').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });
 
});
};
/*
 * Accessible TAB navigation
 */
;(function($){
    var isWindowsPhone = /Windows Phone/.test(navigator.userAgent);
    var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

    $.fn.tabNav = function(opt) {
        var options = $.extend({
            hoverClass: 'open',
            items: 'li',
            opener: 'a',
            delay: 10
        },opt);

        if(isWindowsPhone || isTouchDevice) {
            return this;
        }

        return this.each(function() {
            var nav = $(this), items = nav.find(options.items);

            items.each(function(index, navItem) {
                var item = $(this), navActive, touchNavActive;
                var link = item.find(options.opener), timer;

                link.bind('focus', function() {
                    navActive = nav.hasClass('js-nav-active');
                    touchNavActive = window.TouchNav && TouchNav.isActiveOn(navItem);
                    if(!navActive || touchNavActive) {
                        initSimpleNav();
                    }
                    item.trigger(navActive && touchNavActive ? 'itemhover' : 'mouseenter');
                }).bind('blur', function() {
                    item.trigger(navActive && touchNavActive ? 'itemleave' : 'mouseleave');
                });

                var initSimpleNav = function() {
                    if(!initSimpleNav.done) {
                        initSimpleNav.done = true;
                        item.hover(function() {
                            clearTimeout(timer);
                            timer = setTimeout(function() {
                                item.addClass(options.hoverClass);
                            }, options.delay);
                        }, function() {
                            clearTimeout(timer);
                            timer = setTimeout(function() {
                                item.removeClass(options.hoverClass);
                            }, options.delay);
                        });
                    }
                };
            });
        });
    };
}(jQuery));