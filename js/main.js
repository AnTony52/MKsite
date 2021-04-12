jQuery(document).ready(function ($) {
    const swiper = new Swiper('.home-stories .swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: false,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });

    $(".home-report-slider").slick({
        // normal options...
        infinite: false,
        // the magic
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                infinite: true
            }

        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                dots: true
            }

        }, {
            breakpoint: 300,
            settings: "unslick" // destroys slick

        }]
    });

    if ($('.our-fund-content .our-fund-tabs').length > 0) {
        $('.our-fund-content .our-fund-tabs ul li a').on('click', function (e) {
            e.preventDefault();
            $(this).parents('ul').find('li.active').removeClass('active');
            $(this).parent().addClass('active');

            var index = $(this).parent().index();
            $('.our-fund-content .tab-content .tab-panel').fadeOut('medium', function () {
                $('.our-fund-content .tab-content .tab-panel:eq(' + index + ')').show();
            });
        })
    }

    //    $('*[data-modal="popup-video"]').on('click',function(e){
    //        e.preventDefault();
    //        var iframe = '<iframe src="https://player.vimeo.com/video/{id}" width="100%" height="100%" frameborder="0" title="" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    //        var url = $(this).data('url');
    //        var urls = url.split('/');
    //        var code = urls[urls.length - 1];
    //        var view_iframe = iframe.replace('{id}',code);
    //        $('.modal-popup .modal-popup-content .modal-body').html(view_iframe);
    //        $('.modal-popup').fadeIn();
    //    })    
    //    
    //    $('.modal-popup .modal-popup-content').on('click','.modal-close',function(){
    //        $(this).parents('.modal-popup').fadeOut('medium');
    //    })
    var controller = new ScrollMagic.Controller();
    var heightMain = document.querySelector(".mainwrapper").offsetHeight;
    var getInTouchSpinner = new ScrollMagic.Scene({
        triggerElement: ".mainwrapper",
        duration: "100%",
    })
    .setTween(".get-in-touch", {
        y: 100
    })
    .addIndicators({
        name: "Spinner",
        color: "#259b97",
    })
    .addTo(controller);
})