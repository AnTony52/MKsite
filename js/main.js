// ==================================
// 
// ==================================
var reportSlide = (selector) => {
    var elem = document.querySelector(selector);
    var flkty = new Flickity(elem, {
        // options
        cellAlign: 'left',
        contain: true,
        accessibility: true,
        prevNextButtons: false,
        pageDots: false,
        setGallerySize: false,
        draggable: true,
        friction: 0.35,
        imagesLoaded: true,
        percentPosition: true,
        wrapAround: true,
        initialIndex: 0,
    });
}
// ==================================
// Parallax Slide
// ==================================
var parallaxSlider = (selector, child, initialIndex = 0) => {
    options = {
        accessibility: 1,
        prevNextButtons: 0,
        pageDots: 0,
        setGallerySize: 0,
        draggable: 1,
        friction: 0.5,
        imagesLoaded: 1,
        percentPosition: 1,
        wrapAround: 1,
        initialIndex: initialIndex,
    }
    var carousel = document.querySelector(selector);
    var flkty = new Flickity(carousel, options);
    window.onresize = function (event) {
        flkty.resize();
        document.querySelector('.flickity-viewport').style.height = null;
    };
    // ================================
    //  get list of images
    // ================================
    var imgs = document.querySelectorAll(child);
    // get transform propedrty
    let docStyle = document.documentElement.style;
    let transformProp = typeof docStyle.transform == 'string' ?
        'transform' : 'WebkitTransform';
    flkty.on('scroll', function () {
        if (jQuery(child).length > 2) {
            flkty.slides.forEach(function (slide, i) {
                let img = imgs[i],
                    x = 0;
                if (0 === i) {
                    x = Math.abs(flkty.x) > flkty.slidesWidth ?
                        (flkty.slidesWidth + flkty.x + flkty.slides[flkty.slides.length - 1].outerWidth + slide.target) :
                        (slide.target + flkty.x);
                } else if (i === flkty.slides.length - 1) {
                    x = Math.abs(flkty.x) + flkty.slides[i].outerWidth < flkty.slidesWidth ?
                        (slide.target - flkty.slidesWidth + flkty.x - flkty.slides[i].outerWidth) :
                        (slide.target + flkty.x);
                } else {
                    x = slide.target + flkty.x;
                }
                img.style[transformProp] = 'translateX(' + x * (-1 / 2) + 'px)';
            });
        }
    });
    jQuery('.stories-button').on('click', '.stories-prev', function () {
        flkty.previous();
    });
    jQuery('.stories-button').on('click', '.stories-next', function () {
        flkty.next();
    });
}

// ====================================================
// 
// ====================================================
jQuery(document).ready(function ($) {
    // ----------------------
    // Smart scroll
    // ----------------------
    if (jQuery('#header').length > 0) { // check if element exists
        var last_scroll_top = 0;
        jQuery(window).on('scroll', function () {
            scroll_top = jQuery(this).scrollTop();
            if (scroll_top > 10) {
                (scroll_top < last_scroll_top) ? jQuery('#header').removeClass('scrolled-down').addClass('scrolled-up'): jQuery('#header').removeClass('scrolled-up').addClass('scrolled-down');
                last_scroll_top = scroll_top;
            }
            scroll_top > 500 ? jQuery('#header').addClass("bloody-hat--On") : jQuery('#header').removeClass("bloody-hat--On");
        });
    }
    // ----------------------
    // on Load
    // ----------------------
    
    // const target = document.querySelectorAll('.target, .report-content h3 a, .our-fund-tabs .tab-content ul li a');
    // if (target) {
    //     const bannerText = Splitting({
    //         target: target,
    //         by: 'lines',
    //     });
    // }

    if (document.querySelector("#banner h1")) {
        // .mainwrapper
        var onLoad = gsap.timeline({
                paused: 1,
            })
            .to('#loading', 1.5, {
                xPercent: -100,
                delay: 0.5,
                ease: Power4.easeInOut,
            })
            .from("h1 .word", 1, {
                yPercent: 100,
                // transformOrigin: "left",
                opacity: 0.5,
                stagger: 0.1,
                // skewX: 30,
                ease: Power1.easeInOut,
                delay: 0.1,
            })
            .from("#banner .subject", 3, {
                opacity: 0,
            }, 3);
        jQuery("img").imagesLoaded(() => {
            onLoad.play();
        });
    }
    // --------------------------------------------
    // on Load Home Page
    // --------------------------------------------
    if (document.querySelector("#loading.home-page")) {
        jQuery('img').imagesLoaded(function () {
            // images have loaded
            var count = 0;
            var counter = setInterval(function () {
                if (count < 21) {
                    jQuery('#count').text(count);
                    count++;
                } else if (count >= 21 && count < 25) {
                    console.info("else if");
                    setTimeout(() => {
                        // jQuery('#count').text("25");
                        jQuery('#count').text(count);
                    }, 1000);
                    count++;
                } else {
                    clearInterval(counter);
                    gsap.timeline()
                        .to(".subject-count", 1, {
                            autoAlpha: 0,
                            delay: 2,
                        })
                        .to("#loading", 1, {
                            autoAlpha: 0,
                        })
                        .from(".m-c-center", 1, {
                            autoAlpha: 0,
                        })
                        .to(".m-c-center", 1, {
                            autoAlpha: 0,
                            delay: 1,
                        })
                        .to(".main-copy", 1, {
                            autoAlpha: 0,
                        })
                        .to(".main-bg", 2, {
                            scale: 1.3,
                        }, '-=1')
                        .from('.main-subjects h3, #panel', 1, {
                            autoAlpha: 0,
                            stagger: 0.1,
                        })
                }
            }, 50);
        });
        //-----------------------------------------------------
        // Hover targets on Home
        //-----------------------------------------------------
        jQuery(".main-subjects a").mouseenter(function () {
            jQuery(this).addClass("focused");
            jQuery(this).parent().siblings().children("a").addClass("focused-out");
            jQuery("#panel>div").eq(jQuery(this).parent().index()).addClass("focused");
            jQuery("#panel>div").eq(jQuery(this).parent().index()).siblings().addClass("focused-out");
        });
        jQuery(".main-subjects a").mouseleave(function () {
            jQuery(this).removeClass("focused");
            jQuery(this).parent().siblings().children("a").removeClass("focused-out");
            jQuery("#panel>div").eq(jQuery(this).parent().index()).removeClass("focused");
            jQuery("#panel>div").eq(jQuery(this).parent().index()).siblings().removeClass("focused-out");
        });

        document.querySelectorAll(".main-subjects a").forEach((target) => {
            target.addEventListener("click", (e) => {
                e.preventDefault();
                document.querySelector("#loading").classList.remove("dark-mode");
                gsap.set("#loading", {
                    xPercent: 100,
                    autoAlpha: 1,
                });
                gsap.timeline()
                    .to("#loading", 1, {
                        xPercent: 0,
                        ease: Power4.easeInOut,
                        onComplete: () => {
                            window.location = target.getAttribute("href")
                        },
                    });
            });
        });
    }
    // ----------------------
    // Stories
    // ----------------------
    if (document.querySelector(".home-stories")) {
        parallaxSlider(".home-stories .carousel-wrapper", ".home-stories .carousel-wrapper .home-stories-thumbnail");
        parallaxSlider(".home-stories .second-carousel-wrapper", ".home-stories .second-carousel-wrapper .home-stories-thumbnail", 1);
    }

    // ----------------------
    // Reports
    // ----------------------
    if (document.querySelector('.home-report-slider')) {
        reportSlide('.home-report-slider');
    }
    // ----------------------
    // PE Track
    // ----------------------
    if (document.querySelector(".home-news")) {
        parallaxSlider(".home-news .carousel-wrapper", ".home-news .carousel-wrapper .home-stories-thumbnail");
        parallaxSlider(".home-news .second-carousel-wrapper", ".home-news .second-carousel-wrapper .home-stories-thumbnail", 1);
    }

    // 
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

    // if ($('.our-fund-tabs .tab-content').length > 0) {
    //     $('.our-fund-tabs .tab-content .tab-panel ul li a').on('mouseover', function () {
    //         $('.our-fund-image').show();
    //     }).on('mouseout', function () {
    //         $('.our-fund-image').hide();
    //     })
    // }

    // if ($('.home-team .home-team-content').length > 0) {
    //     $('.home-team .home-team-content ul li').on('mouseover', function () {
    //         $('.home-team-image').attr('src', $(this).data('image')).show();
    //     }).on('mouseout', function () {
    //         $('.home-team-image').hide();
    //     })
    // }
    // =================
    // Modal Popup
    // =================
    var modalPopup = {
        galleries: [],
        markup: '<div class="popup-gallery">\n\
                                <div class="popup-gallery-thumbnail"><img class="" src="[image_active]" alt="" /></div>\n\
                                <div class="popup-gallery-info">\n\
                                    <div class="popup-cation">[title_active]</div>\n\
                                    <div class="popup-action">\n\
                                        <span class="action-arrow-prev"></span>\n\
                                        <span class="action-number">[count] / [length]</span>\n\
                                        <span class="action-arrow-next"></span>\n\
                                    </div>\n\
                                </div>\n\
                            </div>',
        index_active: 0,
        title_active: '',
        init: function () {
            $('*[data-modal]').on('click', function (e) {
                e.preventDefault();
                $('.modal-popup').attr('modal-type', $(this).data('modal'));
                if ($(this).data('modal') == "popup-gallery") {
                    modalPopup.init_popup_gallery($(this));
                }
                $('.modal-popup').fadeIn();
            });

            $('.modal-popup').on('click', '.action-arrow-prev', function () {
                modalPopup.prev();
            }).on('click', '.action-arrow-next', function () {
                modalPopup.next();
            })
        },
        init_popup_gallery: function (obj) {
            modalPopup.galleries = $('body').find('a[data-modal="popup-gallery"]');
            if (obj != undefined) {
                modalPopup.index_active = obj.parent().index();
            }
            modalPopup.title_active = $(modalPopup.galleries[modalPopup.index_active]).data('title') != undefined ? $(modalPopup.galleries[modalPopup.index_active]).data('title') : $(modalPopup.galleries[modalPopup.index_active]).attr('title');

            var clone_markup = modalPopup.markup;
            clone_markup = clone_markup.replace('[image_active]', $(modalPopup.galleries[modalPopup.index_active]).attr('href'));
            clone_markup = clone_markup.replace('[title_active]', modalPopup.title_active);
            clone_markup = clone_markup.replace('[count]', modalPopup.index_active + 1);
            clone_markup = clone_markup.replace('[length]', modalPopup.galleries.length);

            $('.modal-popup .modal-popup-content .modal-body').html(clone_markup);
        },
        next: function () {
            modalPopup.index_active++;
            var current = parseInt(modalPopup.index_active) + 1;

            $('.modal-popup[modal-type="popup-gallery"] .action-arrow-prev').removeClass('disabled');

            if (current >= modalPopup.galleries.length) {
                modalPopup.index_active = parseInt(modalPopup.galleries.length) - 1;
                modalPopup.change();
                $('.modal-popup[modal-type="popup-gallery"] .action-arrow-next').addClass('disabled');
            } else {
                modalPopup.change();
            }
        },
        prev: function () {
            modalPopup.index_active--;
            var current = parseInt(modalPopup.index_active) + 1;

            $('.modal-popup[modal-type="popup-gallery"] .action-arrow-next').removeClass('disabled');

            if (current <= 0) {
                modalPopup.index_active = 0;
                modalPopup.change();
                $('.modal-popup[modal-type="popup-gallery"] .action-arrow-prev').addClass('disabled');
            } else {
                modalPopup.change();
            }
        },
        change: function (index) {
            if (index == undefined) {
                index = modalPopup.index_active;
            } else {
                modalPopup.index_active = index;
            }
            modalPopup.init_popup_gallery();
        }
    };
    modalPopup.init();

    // =================
    // Team
    // =================
    $('.list-team .item-team').on('mouseenter', function () {
        $(this).find('.content-text').fadeIn('medium');
    }).on('mouseleave', function () {
        $(this).find('.content-text').fadeOut('medium');
    })

    //        $('*[data-modal="popup-video"]').on('click',function(e){
    //            e.preventDefault();
    //            var iframe = '<iframe src="https://player.vimeo.com/video/{id}" width="100%" height="100%" frameborder="0" title="" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    //            var url = $(this).data('url');
    //            var urls = url.split('/');
    //            var code = urls[urls.length - 1];
    //            var view_iframe = iframe.replace('{id}',code);
    //            $('.modal-popup .modal-popup-content .modal-body').html(view_iframe);
    //            $('.modal-popup').fadeIn();
    //        })    

    $(window).on('keyup', function (e) {
        console.log(e.which);

        switch (e.which) {
            case 13:
                break;
                // esc      
            case 27:
                $('.modal-popup').fadeOut('medium');
                break;
                //key next
            case 39:
                break;
                //key prev
            case 37:
                break;
        }
    })
    $('.modal-popup .modal-popup-content').on('click', '.modal-close', function () {
        $(this).parents('.modal-popup').fadeOut('medium');
    })

    // =================
    // Page Blocks
    // =================
    gsap.set('.page .page-content .tab-page ul li', {
        opacity: 0,
        ease: Power4.easeInOut,
    });
    gsap.set('.page .page-content .col-md-4', {
        opacity: 0,
        ease: Power4.easeInOut,
    });
    gsap.set('.page-content .content-text h3', {
        // yPercent: 100,
        y: 30,
        opacity: 0,
        ease: Power4.easeInOut,
    })
    gsap.timeline()
        .to('.page .page-content .tab-page ul li', 1, {
            // yPercent: 0,
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: Power4.easeInOut,
        })
        .to('.page-content .content-text h3', 1, {
            // yPercent: 0,
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: Power4.easeInOut,
        })
        .to('.page-content .col-md-4', 1, {
            opacity: 1,
            stagger: 0.2,
            ease: Power4.easeInOut,
        }, 0.5);

    //    $('.page-content .col-md-4').on('mouseenter', function () {
    //    }).on('mouseleave', function () {
    // $('*[data-modal="popup-video"]').on('click',function(e){
    //     e.preventDefault();
    //     var iframe = '<iframe src="https://player.vimeo.com/video/{id}" width="100%" height="100%" frameborder="0" title="" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    //     var url = $(this).data('url');
    //     var urls = url.split('/');
    //     var code = urls[urls.length - 1];
    //     var view_iframe = iframe.replace('{id}',code);
    //     $('.modal-popup .modal-popup-content .modal-body').html(view_iframe);
    //     $('.modal-popup').fadeIn();
    // })    

    //    $('.modal-popup .modal-popup-content').on('click','.modal-close',function(){
    //        $(this).parents('.modal-popup').fadeOut('medium');
    //    })
    // ==========================================================

    // =================
    // Init Controller
    // =================
    var controller = new ScrollMagic.Controller();

    // =================
    // Get In Touch Spin
    // =================
    if (document.querySelector(".mainwrapper")) {
        var heightMain = document.querySelector(".mainwrapper").offsetHeight;
    }

    // =================
    // Home-stories
    // =================
    // gsap.set(".home-stories-content>*", {
    //     y: 30,
    //     opacity: 0,
    // });
    gsap.set(".carousel-wrapper, .second-carousel-wrapper", {
        opacity: 0,
    });

    var homeStories = new ScrollMagic.Scene({
            triggerElement: ".home-stories",
            duration: 100,
            offset: -100,
        })
        .on("enter", function () {
            gsap.timeline()
                .to('.carousel-wrapper, .second-carousel-wrapper', 1, {
                    opacity: 1,
                    stagger: 0.25,
                    ease: Power4.easeInOut,
                });
        })
        // .addIndicators({
        //     name: "homeStories"
        // }) // add indicators (requires plugin)
        .addTo(controller);
    // ========================================
    // Report Breakthrough
    // ========================================
    gsap.set('.slider-item', {
        opacity: 0,
        ease: Power4.easeInOut,
    });
    gsap.set('.home-report-title h3 .word', {
        // yPercent: 100,
        y: 30,
        opacity: 0,
        ease: Power4.easeInOut,
    })
    if (document.querySelector(".home-report")) {
        var heightReport = document.querySelector(".home-report").offsetHeight;
    }
    var homeReport = new ScrollMagic.Scene({
            triggerElement: ".home-report",
            duration: "200%",
            offset: 100,
        })
        .on("enter", function () {
            gsap.timeline()
                .to('.home-report-title h3 .word', 1, {
                    // yPercent: 0,
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    ease: Power4.easeInOut,
                })
                .to('.slider-item', 1, {
                    opacity: 1,
                    stagger: 0.2,
                    ease: Power4.easeInOut,
                }, 0.5);
        })
        // .addIndicators({
        // name: "Report"
        // }) // add indicators (requires plugin)
        .addTo(controller);
    // ========================================
    // Our Funds
    // ========================================
    gsap.set('.our-fund-content h3 .word', {
        opacity: 0,
    });
    gsap.set('.our-fund-tabs>ul>li>a, .our-fund-tabs .tab-content ul li a .word', {
        yPercent: 100,
        opacity: 0,
        // offset: 100,
    });
    var ourFunds = gsap.timeline({
            paused: 1,
        })
        .to('.our-fund-content h3 .word', 1, {
            opacity: 1,
            stagger: 0.1,
            delay: 0.5,
        })
        .to('.our-fund-tabs>ul>li>a, .our-fund-tabs .tab-content ul li a .word', 1, {
            yPercent: 0,
            opacity: 1,
            stagger: 0.1,
        });
    new ScrollMagic.Scene({
            triggerElement: ".our-fund",
            duration: "150%",
            offset: -100,
        })
        .on('enter', () => {
            ourFunds.play();
        })
        .on('leave', () => {
            ourFunds.reverse();
        })
        // .setTween(ourFunds)
        // .addIndicators({
        //     name: "Our Funds",
        // }) // add indicators (requires plugin)
        .addTo(controller);
    // ======================
    // Title Funds Running
    // ======================
    // var heightFunds = document.querySelector(".our-fund").offsetHeight;
    var titleFund = gsap.timeline({
            scrollTrigger: {
                trigger: ".our-fund",
                // markers: true,
                scrub: 2,
                start: "bottom top", // when the top of the trigger hits the top of the viewport
                end: "+= 500",

            },
        })
        .fromTo(".our-fund h3", 1, {
            xPercent: 30,
            // ease: Power3.easeOut,
        }, {
            xPercent: -30,
            // ease: Power4.easeOut,
        });
    // new ScrollMagic.Scene({
    //         triggerElement: ".our-fund",
    //         duration: "200%",
    //         offset: -100,
    //     })
    //     .setTween(titleFund)
    //     // .addIndicators({
    //     //     name: "Our Funds",
    //     // }) // add indicators (requires plugin)
    //     .addTo(controller);
    // ======================
    // Why Vietnam Flying Up
    // ======================
    if (document.querySelector(".home-why")) {
        var heightWhy = document.querySelector(".home-why").offsetHeight;
    }
    var flyingUpTl = gsap.timeline({
            // paused: true,
        })
        .to(".home-why-thumb-left", 1, {
            y: -heightWhy * 1.5,
        })
        .to(".home-why-thumb-right", 1, {
            y: -heightWhy * 1.5,
        }, '-=0.5')
        .to(".home-why-thumb-bottom", 1, {
            y: -heightWhy * 1.5,
        }, '-=0.5');
    var thumbLeft = new ScrollMagic.Scene({
            triggerElement: ".home-why",
            duration: heightWhy * 2,
            offset: -100,
        })
        .setTween(flyingUpTl) // trigger a TweenMax.to tween
        // .addIndicators({
        //     name: "Flying Up Left"
        // }) // add indicators (requires plugin)
        .addTo(controller);
    // ======================
    // Why Viet Nam Text
    // ======================
    const whyVietNamSplit = document.querySelector('.home-why-content');
    if (whyVietNamSplit) {
        var charTarget = Splitting({
            target: whyVietNamSplit,
            by: 'lines',
        });
        gsap.set(charTarget[0].lines, {
            autoAlpha: 0,
            yPercent: 50,
        });
        var whyVietNamTextTl = gsap.timeline().to(charTarget[0].lines, 1, {
            autoAlpha: 1,
            yPercent: 0,
            stagger: 0.05,
        });

        new ScrollMagic.Scene({
                triggerElement: ".home-why",
                duration: "100%",
                offset: -200,
            })
            .setTween(whyVietNamTextTl) // trigger a TweenMax.to tween
            // .addIndicators({
            // }) // add indicators (requires plugin)
            .addTo(controller);
    }
    // =======================
    // World Class Team
    // =======================
    gsap.set(".home-team-content li", {
        opacity: 0,
        yPercent: -40,
    });
    var classTeamTl = gsap.timeline({
        paused: 1,
    }).to('.home-team-content li', 1, {
        opacity: 1,
        yPercent: 0,
        stagger: 0.3,
    });
    new ScrollMagic.Scene({
            triggerElement: ".home-team",
            duration: "120%",
            offset: -200,
        })
        .on('enter', () => {
            classTeamTl.play();
        })
        .on('leave', () => {
            classTeamTl.reverse();
        })
        // .setTween(classTeamTl) // trigger a TweenMax.to tween
        // .addIndicators({
        //     name: "World Class Team",
        // }) // add indicators (requires plugin)
        .addTo(controller);
    //-----------------------------------------------------
    // World Class Animation    
    //-----------------------------------------------------
    jQuery(".home-team-content li a").mouseenter(function () {
        jQuery(this).parent().addClass("focused");
        jQuery(this).parent().siblings().addClass("focused-out");
        jQuery('.home-team-image').attr('src', jQuery(this).parent().find('a').data('image')).show();
    });
    jQuery(".home-team-content li a").mouseleave(function () {
        jQuery(this).parent().removeClass("focused");
        jQuery(this).parent().siblings().removeClass("focused-out");
        jQuery('.home-team-image').hide();
    });

    $('.modal-fund-tabs > ul li a').on('click', function (e) {
        e.preventDefault();
        $(this).parents('ul').find('li.active').removeClass('active');
        $(this).parent().addClass('active');
        var index = $(this).parent().index();
        $('.modal-fund-tabs .tab-content .tab-panel').fadeOut('medium', function () {
            $('.modal-fund-tabs .tab-content .tab-panel:eq(' + index + ')').show();
        });
    })

    //-----------------------------------------------------
    // Clouds
    //-----------------------------------------------------
    gsap.timeline({
        repeat: -1,
    }).fromTo(".cloud-1, .cloud-3", 60, {
        x: 700,
    }, {
        x: -700,
    });
    gsap.timeline({
        repeat: -1,
    }).fromTo(".cloud-2", 60, {
        x: -700,
    }, {
        x: 700,
    });
    //-----------------------------------------------------
    // let root = document.documentElement;
    // root.addEventListener("mousemove", e => {
    //     root.style.setProperty('--mouse-x', e.clientX + "px");
    //     root.style.setProperty('--mouse-y', e.clientY + "px");
    // });

    //-----------------------------------------------------
    // gsap.timeline({
    //         scrollTrigger: {
    //             trigger: ".horizon-carousel",
    //             // markers: true,
    //             pin: true,
    //             start: "top top", // when the top of the trigger hits the top of the viewport
    //             end: "+=5000", // end after scrolling 500px beyond the start
    //             scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
    //             // snap: {
    //             //     snapTo: "labels", // snap to the closest label in the timeline
    //             //     duration: {
    //             //         min: 0.2,
    //             //         max: 3
    //             //     }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
    //             //     delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
    //             //     ease: "power1.inOut" // the ease of the snap animation ("power3" by default)
    //             // }
    //         },
    //         // repeat: -1,
    //     })
    //     .fromTo(".top-carousel", 1, {
    //         xPercent: -50,
    //     }, {
    //         xPercent: 0,
    //     })
    //     .fromTo(".bottom-carousel", 1, {
    //         xPercent: 0,
    // }, {
    //     xPercent: -50,
    // }, '-=1');
    //-----------------------------------------------------
})

class Cursor {
    constructor() {
        this.initCursor();
        this.initHovers();
    }
    initCursor() {
        const {
            Back
        } = window;
        this.outerCursor = document.querySelector(".circle-cursor--outer");
        this.innerCursor = document.querySelector(".circle-cursor--inner");
        this.outerCursorBox = this.outerCursor.getBoundingClientRect();
        this.outerCursorSpeed = 0;
        this.easing = Back.easeOut.config(1.7);
        this.clientX = -100;
        this.clientY = -100;
        this.showCursor = false;

        const unveilCursor = () => {
            gsap.set(this.innerCursor, {
                x: this.clientX,
                y: this.clientY
            });
            gsap.set(this.outerCursor, {
                x: this.clientX - this.outerCursorBox.width / 2,
                y: this.clientY - this.outerCursorBox.height / 2
            });
            setTimeout(() => {
                this.outerCursorSpeed = 0.2;
            }, 100);
            this.showCursor = true;
        };
        document.addEventListener("mousemove", unveilCursor);

        document.addEventListener("mousemove", e => {
            this.clientX = e.clientX;
            this.clientY = e.clientY;
        });

        const render = () => {
            gsap.set(this.innerCursor, {
                x: this.clientX,
                y: this.clientY
            });
            if (!this.isStuck) {
                gsap.to(this.outerCursor, this.outerCursorSpeed, {
                    x: this.clientX - this.outerCursorBox.width / 2,
                    y: this.clientY - this.outerCursorBox.height / 2
                });
            }
            if (this.showCursor) {
                document.removeEventListener("mousemove", unveilCursor);
            }
            // request animation frame để tạo vòng lặp cho animation
            requestAnimationFrame(render);
        };
        // gọi ra animation khi sẵn sàng sử dụng.
        requestAnimationFrame(render);
    }

    initHovers() {
        const handleMouseEnter = e => {
            this.isStuck = true;
            const target = e.currentTarget;
            const box = target.getBoundingClientRect();
            this.outerCursorOriginals = {
                width: this.outerCursorBox.width,
                height: this.outerCursorBox.height
            };
            gsap.to(this.outerCursor, 0.2, {
                x: box.left,
                y: box.top,
                width: box.width,
                height: box.height,
                opacity: 1,
                // scale: 0.9,
                borderColor: "#b70004"
            });
        };

        const handleMouseLeave = () => {
            this.isStuck = false;
            gsap.to(this.outerCursor, 0.2, {
                width: this.outerCursorOriginals.width,
                height: this.outerCursorOriginals.height,
                opacity: 1,
                borderColor: "#b70004",
                // borderWidth: 2,
            });
        };

        const linkItems = document.querySelectorAll(".home-stories-icon");
        linkItems.forEach(item => {
            item.addEventListener("mouseenter", handleMouseEnter);
            item.addEventListener("mouseleave", handleMouseLeave);
        });

        const mainNavHoverTween = gsap.to(this.outerCursor, 0.5, {
            width: 80,
            height: 80,
            xPercent: -25,
            yPercent: -25,
            borderColor: "#b70004",
            ease: this.easing,
            paused: true
        });

        const mainNavMouseEnter = () => {
            this.outerCursorSpeed = 0;
            gsap.set(this.innerCursor, {
                opacity: 0
            });
            mainNavHoverTween.play();
        };

        const mainNavMouseLeave = () => {
            this.outerCursorSpeed = 0.2;
            gsap.set(this.innerCursor, {
                opacity: 1
            });
            mainNavHoverTween.reverse();
        };

        const mainNavLinks = document.querySelectorAll(".cvb");
        mainNavLinks.forEach(item => {
            item.addEventListener("mouseenter", mainNavMouseEnter);
            item.addEventListener("mouseleave", mainNavMouseLeave);
        });
    }
}
const cursorCustomize = new Cursor();