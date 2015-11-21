/*
 *  Bulb - HTML template & Wordpress theme
 *  Copyright © 2012 Vincent Bianciotto - http://www.celavi.fr
 *  
 *  @date 01/04/2013
 *  @licence CC BY-NC 3.0
 *  @author Vincent Bianciotto
 *  @version v0.1
 */

jQuery.noConflict();
(function($) { 
    $(function() {

        // ---------------------------------------------------------------------------------------------------------------
        //          MISC
        
        // Vars
        var $html = $('html'),
            $body = $('body'),
            $menu = $('.menu'),
            $keywords = $('.keywords');

        // Keywords slider
        if(typeof $.fn.responsiveSlides === 'function') {
            if($keywords.length == true) {
                $keywords.responsiveSlides({'speed': 700});
            }
        }
        
        // Convert all <video> and <audio> tags to MediaElement.js
        if($html.hasClass('video') && $html.hasClass('audio')) {
            if($body.hasClass('blog-index')) {
                $('video, audio').mediaelementplayer({
                    audioWidth: '100%',
                    enableAutosize: true
                });
            }
        }

        // FitVids.js
        if(typeof $.fn.fitVids === 'function') {
            if($body.hasClass('blog-index') || $body.hasClass('single-post') || $body.hasClass('homepage3')) {
                $('.post').fitVids();
            }
        }

        // ---------------------------------------------------------------------------------------------------------------
        //      Cross-Browser & Cross-platform support

        // CSS3 PIE
        // http://css3pie.com
        var initPIE = function() {
            var elements = '.icon-rounded,'+
                           '.post .post-format,'+
                           '.team1 .teammate .avatar,'+
                           '.team1 .teammate .avatar img,'+
                           '.team2 .teammate blockquote .infos img,'+
                           '.team1 .teammate .avatar .social li a,'+
                           '.huge-social li a';
            $(elements).each(function() {
                PIE.attach(this);
            });
        }

        // CSS3 PIE Async load with headjs
        if (head.browser.ie) {
            head.js('js/vendor/PIE.js', function(){
                if (window.PIE) {
                    initPIE();
                }
            });
        }

        // Off canvas mobile nav menu
        // --------------------------
        $('#toggleMobilenav').click(function(){
            $body.toggleClass('mobilenav-open');
            $(this).toggleClass('active');

            return false;
        });

        // IE7 & IE8
        if($html.hasClass('lt-ie9')){

            // Team page
            $('.teammates .teammate:nth-child(3n)').addClass('nth-child-3n');
        }

        // IE7
        if($html.hasClass('lt-ie8')){

            // Add icons on accordions and toggles
            var accordionPlus = $('<div>', {'class': 'easycons-plus-rounded'}),
                accordionLess = $('<div>', {'class': 'easycons-less-rounded'}),
                accordionExpand = $('<div>', {'class': 'easycons-arrow-down'}),
                accordionCollapse = $('<div>', {'class': 'easycons-arrow-up'});

            $('[class="accordion"]').find('.accordion-group .accordion-toggle').append(accordionPlus);
            $('[class="accordion toggle"]').find('.accordion-group .accordion-toggle').append(accordionExpand);
        }


        // ---------------------------------------------------------------------------------------------------------------
        //          LAYOUT

        // Sticky header
        var initStikcyHeader = function() {
            var header = $('.header-wrapper'),
                menuWrapper = $('.menu-wrapper'),
                scrollTop = $(document).scrollTop(),
                limit = 1;

            if (scrollTop >= limit) {
               header.addClass('sticky');
               menuWrapper.addClass('sticky');
            } else if (scrollTop <= limit) {
               header.removeClass('sticky');
               menuWrapper.removeClass('sticky');
            }
        }

        $(window).ready(function(){
            initStikcyHeader();
        });

        $(window).scroll(function(){
            initStikcyHeader();
        });

        // ---------------------------------------------------------------------------------------------------------------
        //          PATTERNS

        // If brands are in the DOM
        if($('.brands-wrapper .brands').length == true) {
            var brandsWrapper = $('.brands-wrapper .brands'),
                brandsHeight = parseInt(brandsWrapper.css('height').replace('px', '')),
                brandsWidth = brandsWrapper.width(),
                brandNode = brandsWrapper.find('div'),
                showMore = $('<a>', {
                                'class': 'show-more',
                                'href': '#',
                                'html': '<span>Show more</span><i class="easycons-arrow-down"></i>'
                            }),
                showLess = $('<a>', {
                                'class': 'show-less',
                                'href': '#',
                                'html': '<span>Show less</span><i class="easycons-arrow-up"></i>'
                            }),
                trueBrandsWidth = 0,
                brandNodeMarginTop,
                brandNodeMarginLeft,
                trueBrandsHeight;
        
            // Waiting for images loaded
            // and calculate true width brands wrapper
            $(window).load(function(){
                brandNode.each(function(i){

                    // Margin top css value
                    brandNodeMarginTop = parseInt($(this).css('marginTop').replace('px', '') * 2);
                    // Margin left css value
                    brandNodeMarginLeft = parseInt($(this).css('marginLeft').replace('px', '') * 2);

                    // Calculate true width
                    trueBrandsWidth += ($(this).width() + brandNodeMarginLeft) + (brandNode.length * 5);

                    // Calculate true height
                    trueBrandsHeight = Math.ceil(trueBrandsWidth / brandsWidth) * ($(this).height() + brandNodeMarginTop);

                    // If brands wrapper width is outer container, add show more button
                    if((trueBrandsWidth) >= brandsWidth) {
                        brandsWrapper.after(showMore).after(showLess);
                        showLess.hide();
                    }
                });
            });

            // Show more toggle button click
            showMore.click(function(){

                // Expand wrapper
                brandsWrapper.css({height: trueBrandsHeight + 20});
                showMore.hide();
                showLess.show();

                return false;
            });

            // Show less button
            showLess.click(function(){

                // Collapse wrapper
                brandsWrapper.css({height: brandsHeight});
                showLess.hide();
                showMore.show();

                return false;
            });
        }

        // ---------------------------------------------------------------------------------------------------------------
        //          BLOG

        if(typeof $.fn.responsiveSlides === 'function') {
            if($body.hasClass('blog-index') || $body.hasClass('homepage3')){
                $('.post.format-gallery .rslides').responsiveSlides({
                    'timeout': 4000,
                    'nav': true,
                    'speed': 700,
                    'prevText': '<i class="easycons-arrow-left"></i>',
                    'nextText': '<i class="easycons-arrow-right"></i>'
                });
            }
        }

        // ---------------------------------------------------------------------------------------------------------------
        //          HOMEPAGE 2

        if(typeof $.fn.responsiveSlides === 'function') {
            if($body.hasClass('homepage2')){
                $('#homeSlider').responsiveSlides({
                    'timeout': 8000,
                    'pager': true,
                    'speed': 700,
                    before: function(){
                        $('#sliderProgress').removeClass('animate');
                    },
                    after: function(){
                        $('#sliderProgress').addClass('animate');
                    }
                });
            }
        }
        
        // ---------------------------------------------------------------------------------------------------------------
        //          HOMEPAGE 3
        
        if(typeof $.fn.responsiveSlides === 'function') {
            if($body.hasClass('homepage3')){
                $('#homeSlider2').responsiveSlides({
                    'timeout': 8000,
                    'nav': true,
                    'speed': 700,
                    'prevText': '<i class="easycons-arrow-left"></i>',
                    'nextText': '<i class="easycons-arrow-right"></i>',
                    before: function(){
                        $('#sliderProgress').removeClass('animate');
                    },
                    after: function(){
                        $('#sliderProgress').addClass('animate');
                    }
                });
            }
        }

        // ---------------------------------------------------------------------------------------------------------------
        //          PORTFOLIO 1 & 2

        var updateColumWidth = function($container, windowWidth, nbrElem) {
            windowWidth = $(window).width();

            // Resize Listener to set the number of column
            if($body.hasClass('portfolio1') && windowWidth >= 767) {
                nbrElem = 3;
            } else if ($body.hasClass('portfolio2') && windowWidth >= 767) {
                nbrElem = 2;
            } else if (windowWidth < 767) {
                nbrElem = 1;
            }               

            // Update columnWidth after resize
            $container.isotope({
                masonry: { columnWidth: $container.width() / nbrElem }
            });            
        }

        if($body.hasClass('portfolio1') || $body.hasClass('portfolio2')) {
            
            // Vars
            var $container = $('#container'),
                $filters = $('#filters a'),
                windowWidth = $(window).width(),
                nbrElem;
            
            // Check layouts & window width to set column width
            if($body.hasClass('portfolio1') && windowWidth >= 767) {
                nbrElem = 3;
            } else if ($body.hasClass('portfolio2') && windowWidth >= 767) {
                nbrElem = 2;
            } else if (windowWidth < 767) {
                nbrElem = 1;
            }

            // initialize isotope
            $container.isotope({
                resizable: false, // disable normal resizing
                itemSelector: '.project',
                containerStyle: {
                    position: 'relative',
                    overflow: 'visible'
                },
                masonry: {
                    columnWidth: $container.width() / nbrElem
                }
            });

            // Update columnWidth on window load
            $(window).load(function(){
                updateColumWidth($container, windowWidth, nbrElem);
            });

            // Update columnWidth on window resize
            $(window).smartresize(function(){
                updateColumWidth($container, windowWidth, nbrElem);
            });

            // filter items when filter link is clicked
            $filters.click(function(){
                var $this = $(this);
                var selector = $(this).attr('data-filter');

                $filters.not($this).removeClass('active');
                $(this).addClass('active');
                $container.isotope({ filter: selector });
                return false;
            });
        }

        // ---------------------------------------------------------------------------------------------------------------
        //          PORTFOLIO 3

        if($body.hasClass('portfolio3')) {
            
            // Vars
            var $container = $('#container'),
                $filters = $('#filters a');
            
            // initialize isotope
            $container.isotope({
                itemSelector: '.project',
                containerStyle: {
                    position: 'relative',
                    overflow: 'visible'
                }
            });

            // filter items when filter link is clicked
            $filters.click(function(){
                var $this = $(this);
                var selector = $(this).attr('data-filter');

                $filters.not($this).removeClass('active');
                $(this).addClass('active');
                $container.isotope({ filter: selector });
                return false;
            });
        }

        // ---------------------------------------------------------------------------
        //          CONTACT FORM
        //          Based on the work of Trevor Davis
        //          http://trevordavis.net/blog/wordpress-jquery-contact-form-without-a-plugin

        if($body.hasClass('contact')) {

            var $form = $('form#contactForm');
            var $successMessage = $('#successMessage');

            // Submit contact form
            $form.submit(function() {

                // Set error to false
                var hasError = false;

                // Remove errors
                $form.find('[class^="error-"]').remove();

                // Check required fields
                $form.find('[class^="required"], [class*=" required"]').each(function() {
                    if($.trim($(this).val()) == '') {

                        // Get label value
                        var labelText = $(this).prev('label').text();

                        $(this).parent().prepend('<span class="error-field"><strong>'+labelText+'</strong> is required</span>');
                        hasError = true;

                    } else if($(this).hasClass('email')) {

                        // Email regex
                        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

                        if(!emailReg.test($.trim($(this).val()))) {

                            // Label text
                            var labelText = $(this).prev('label').text();

                            $(this).parent().prepend('<span class="error-field"><strong>'+labelText+'</strong> is not valid</span>');
                            hasError = true;
                        }
                    }
                });

                if(!hasError) {

                    // Serialize form
                    var formSerialized = $(this).serialize();
                    // Replace button value
                    $form.find('input[type="submit"]').val('sending...');

                    // POST
                    $.post($(this).attr('action'), formSerialized, function(data){
                        $form.slideUp(500, function() {                
                            $form.before($successMessage);
                            $successMessage.slideDown(300);
                        });
                    });
                }
                
                return false;
            });
        }

    });
})(jQuery);