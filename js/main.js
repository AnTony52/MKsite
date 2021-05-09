// // // ==================================
// PxSlide
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
// ----------------------
// Banner
// ----------------------
var bannerSlider = () => {


    let banner = document.querySelector(".banner-slider");
    if (banner) {
        var flkty = new Flickity(banner, {
            accessibility: 1,
            prevNextButtons: 0,
            pageDots: 0,
            setGallerySize: 0,
            draggable: 1,
            friction: 0.5,
            imagesLoaded: 1,
            percentPosition: 1,
            wrapAround: 1,
            autoPlay: 5000,
            on: {
                ready: (index) => {
                    jQuery('.banner-button').eq(index).addClass("active").siblings().removeClass("active");
                },
                change: (index) => {
                    jQuery('.banner-button').eq(index).addClass("active").siblings().removeClass("active");
                },

            }
        });
        window.onresize = function (event) {
            flkty.resize();
            document.querySelector('.flickity-viewport').style.height = null;
        };
        // ================================
        //  get list of images
        // ================================
        var imgs = document.querySelectorAll(".banner-slider .banner-slider-item img");
        // get transform propedrty
        let docStyle = document.documentElement.style;
        let transformProp = typeof docStyle.transform == 'string' ?
                'transform' : 'WebkitTransform';
        flkty.on('scroll', function () {
            if (jQuery(".banner-slider .banner-slider-item img").length > 2) {
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
    }
    jQuery('.banner-button').on('click', function (e) {
        e.preventDefault();
        jQuery(this).addClass("active").siblings().removeClass("active");
        flkty.select(jQuery(this).index());
    });
}
// ====================================================
// On Ready
// ====================================================
jQuery(document).ready(function ($) {
    /**
     * load html for elements
     */
//    $("html.page header").load("/partials/header.html");
    $('.block-logo').load("/partials/logo-header.html");
    $("footer").load("/partials/footer.html");
    $('#popup-contact').load("/partials/popup-contact.html");
    $('#blocks-modal').load("/partials/modal.html");
    $('.modal-menubar-content').load("/partials/menus.html");

    bannerSlider();
    var scrol_tab_page = 0;
    if (jQuery('#main .tab-page').length > 0) {
        scrol_tab_page = jQuery('#main .tab-page').position().top;
    }

    // ----------------------
    // Menu Smart scroll
    // ----------------------
    if (jQuery('#header').length > 0) { // check if element exists
        var last_scroll_top = 0;
        jQuery(window).on('scroll', function () {
            scroll_top = jQuery(this).scrollTop();
            if (scroll_top > 10) {
                if ((scroll_top < last_scroll_top)) {
                    jQuery('#header').removeClass('scrolled-down').addClass('scrolled-up');
                    if (jQuery('#main .tab-page').length > 0) {
                        jQuery('#main .tab-page').addClass('scrolled-up');
                    }
                } else {
                    jQuery('#header').removeClass('scrolled-up').addClass('scrolled-down');
                    if (jQuery('#main .tab-page').length > 0) {
                        jQuery('#main .tab-page').removeClass('scrolled-up');
                    }
                }
                last_scroll_top = scroll_top;
            }

            scroll_top > 500 ? jQuery('#header').addClass("bloody-hat--On") : jQuery('#header').removeClass("bloody-hat--On");

            if (scroll_top >= scrol_tab_page) {
                if (jQuery('#main .tab-page').length > 0) {
                    jQuery('#main .tab-page').addClass('tab-fixed-top');
                }
            } else {
                if (jQuery('#main .tab-page').length > 0) {
                    jQuery('#main .tab-page').removeClass('tab-fixed-top');
                }
            }
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

    if (document.querySelector("#banner")) {
        // .mainwrapper
        var onLoad = gsap.timeline({
            paused: 1,
        })
                .to('#loading', 1.5, {
                    xPercent: -100,
                    delay: 0.5,
                    ease: Power4.easeInOut,
                })
        // .from("h1 .word", 1, {
        //     yPercent: 100,
        //     // transformOrigin: "left",
        //     opacity: 0.5,
        //     stagger: 0.1,
        //     // skewX: 30,
        //     ease: Power1.easeInOut,
        //     delay: 0.1,
        // })
        // .from("#banner .subject", 3, {
        //     opacity: 0,
        // }, 3);
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

    // =================
    // Page Blocks
    // =================
    gsap.set('.page .page-content .tab-page ul > li', {
        opacity: 0,
        ease: Power4.easeInOut,
    });
    gsap.set('.page .page-content .col-md-4', {
        opacity: 0,
        ease: Power4.easeInOut,
    });
    gsap.set('.page-content .content-text h3, .page-content .content-text .date', {
        // yPercent: 100,
        y: 30,
        opacity: 0,
        ease: Power4.easeInOut,
    })
    gsap.timeline()
            .to('.page .page-content .tab-page ul > li', 1, {
                // yPercent: 0,
                y: 0,
                opacity: 1,
                stagger: 0.3,
                ease: Power4.easeInOut,
            })
            .to('.page-content .content-text h3, .page-content .content-text .date', 1, {
                // yPercent: 0,
                y: 0,
                opacity: 1,
                stagger: 0.1,
                ease: Power4.easeInOut,
            })
            .to('.page-content .col-md-4', 1, {
                opacity: 1,
                stagger: 0.3,
                ease: Power4.easeInOut,
            }, 0.5);

//    $('.page-content .col-md-4').on('mouseenter', function () {
//
//    }).on('mouseleave', function () {
//
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
    var titleFund = gsap.timeline({
        // repeat: -1,
        // yoyo: true,
    })
            .fromTo(".our-fund h3", 1, {
                xPercent: 30,
                // ease: Power3.easeOut,
            }, {
                xPercent: -30,
                ease: Power4.easeOut,
            });
    new ScrollMagic.Scene({
        triggerElement: ".our-fund",
        duration: "200%",
        offset: -100,
    })
            .setTween(titleFund)
            // .addIndicators({
            //     name: "Our Funds",
            // }) // add indicators (requires plugin)
            .addTo(controller);
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
            }, '-=0.5')
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
    // =======================
    // Building Parallaxing
    // =======================
    // var buildingPlxTl = gsap.timeline().fromTo(".building-1 img", 1, {
    //     y: 150,
    // }, {
    //     y: 0,
    // });
    // new ScrollMagic.Scene({
    //         triggerElement: ".city-view",
    //         duration: "100%",
    //         offset: -100,
    //     })
    //     .setTween(buildingPlxTl) // trigger a TweenMax.to tween
    //     // .addIndicators({
    //     //     name: "building Parallax",
    //     // }) // add indicators (requires plugin)
    //     .addTo(controller);

//    $('.modal-fund-tabs > ul li a').on('click', function (e) {
//        e.preventDefault();
//        $(this).parents('ul').find('li.active').removeClass('active');
//        $(this).parent().addClass('active');
//        var index = $(this).parent().index();
//        $('.modal-fund-tabs .tab-content .tab-panel').fadeOut('medium', function () {
//            $('.modal-fund-tabs .tab-content .tab-panel:eq(' + index + ')').show();
//        });
//    })

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

//    let root = document.documentElement;
//    root.addEventListener("mousemove", e => {
//        root.style.setProperty('--mouse-x', e.clientX + "px");
//        root.style.setProperty('--mouse-y', e.clientY + "px");
//    });

    // document.querySelector(".home-team-content").addEventListener("mouseenter", e => {
    //     document.addEventListener("mousemove", e => {
    //         gsap.set(".home-team-image", {
    //             x: e.clientX,
    //             y: e.clientY,
    //         });
    //     });
    // });
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

        const linkItems = document.querySelectorAll(".home-stories-icon-none");
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

// =================
// Modal Popup
// =================
// 
var modalPopup = {
    galleries: [],
    sliders: [],
    markup: '<div class="popup-gallery">\n\
                                <div class="popup-gallery-thumbnail"><img class="" src="[image_active]" alt="" /></div>\n\
                                <div class="popup-gallery-info">\n\
                                    <div class="popup-cation">[title_active]</div>\n\
                                    <div class="popup-action">\n\
                                        <a href="javascript:void(0)" class="cvb"><span class="action-arrow-prev"></span><a/>\n\
                                        <span class="action-number">[count] / [length]</span>\n\
                                        <a href="javascript:void(0)" class="cvb"><span class="action-arrow-next cvb"></span></a>\n\
                                    </div>\n\
                                </div>\n\
                            </div>',
    index_active: 0,
    title_active: '',
    init: function () {
        $('*[data-modal]').on('click', function (e) {
            e.preventDefault();
            var obj = $(this);
            if ($(this).data('modal') != "popup-menubar" && $(this).data('modal') != "popup-contact") {
                gsap.set('.modal-popup', {
                    xPercent: 100,
                });
            } else {
                $('.modal-popup').css({'z-index': 99999, 'transform': 'inherit'});
                $('.menu-overlay').css('transform', 'translate(0%, 0%)');
                if ($(this).data('modal') == "popup-menubar") {
                    gsap.set('.modal-contact-right .footer-menu ul > li', {opacity: 0});
                } else {
                    gsap.set('.getintouch-contact h3', {opacity: 0});
                    gsap.set('.getintouch-contact .getintouch-item', {opacity: 0});
                    gsap.set('.modal-contact-right .contact-form .input-form', {opacity: 0});
                    gsap.set('.modal-contact-right .contact-form button', {opacity: 0});

                }
            }

            $('.modal-popup').attr('modal-type', $(this).data('modal'));
            if ($(this).data('modal') == "popup-gallery") {
                modalPopup.init_popup_gallery($(this));
            } else if ($(this).data('modal') == "popup-data") {
                modalPopup.init_slider($(this));
            } else if ($(this).data('modal') == "popup-get-in-touch") {
                var modal_getInTouch = $(this).parent().find('*[data-modal-getintouch]').html();
                $('.modal-popup .modal-popup-content .modal-body').html(modal_getInTouch);
            } else if ($(this).data('modal') == "popup-contact") {
                var modal_Contact = $(this).parent().find('*[data-modal-contact]').html();
                $('.modal-popup .modal-popup-content .modal-body').html(modal_Contact);
            } else if ($(this).data('modal') == "popup-menubar") {
                var modal_menuBar = $(this).parent().find('*[data-modal-menubar]').html();
                $('.modal-popup .modal-popup-content .modal-body').html(modal_menuBar);
            }

            modalPopup.setButtonClose($(this));

//                gsap.fromTo('.modal-popup', 1,
//                        {x: 600, 'z-index': '-1'},
//                        {x: 0, 'z-index': 99999, duration: 2.5, ease: "slow(0.1, 1, false)", onComplete: function () {
//                                $('html').css('overflow', 'hidden');
//                                cursorCustomize.initHovers();
//                            }});

            if ($(this).data('modal') == "popup-menubar" || $(this).data('modal') == "popup-contact") {
                $('.menu-overlay').show(function () {
                    gsap.fromTo('.menu-overlay', 2, {
                        xPercent: 0,
                    }, {
                        xPercent: '-100',
                        zIndex: 99999,
                        onComplete: function () {

                        }
                    });

                    if (obj.data('modal') == "popup-menubar") {
                        gsap.fromTo('.modal-contact-right .footer-menu ul > li',
                                {y: 20, opacity: 0},
                                {
                                    y: 0,
                                    opacity: 1,
                                    stagger: 0.2,
                                    duration: 2.5,
                                    onComplete: function () {
                                        $('html').css('overflow', 'hidden');
                                        const cursorCustomize = new Cursor();
                                    }
                                }
                        );

                        $('.modal-contact-right .footer-menu ul > li').on('mouseenter', function () {
                            $(this).parent().find('.-word').addClass('grayed');
                            $(this).find('.-word').removeClass('grayed');
//                            '.modal-contact-right .footer-menu ul > li .numbering'
                            gsap.fromTo($(this).find('.numbering'), {
                                x: 20, opacity: 0
                            }, {
                                x: 0, opacity: 1
                            });
                        }).on('mouseleave', function () {
                            $(this).find('.-word').removeClass('grayed');
                            gsap.fromTo($(this).find('.numbering'), {
                                x: 0, opacity: 1
                            }, {
                                x: 20, opacity: 0
                            });
                        });
                    } else {
                        gsap.fromTo('.modal-contact-right .contact-form .input-form',
                                {y: 20, opacity: 0},
                                {
                                    y: 0,
                                    opacity: 1,
                                    stagger: 0.2,
                                    duration: 2.5,
                                    onComplete: function () {
                                        gsap.fromTo('.modal-contact-right .contact-form button',
                                                {y: 20, opacity: 0},
                                                {
                                                    y: 0,
                                                    opacity: 1,
                                                    stagger: 0.2,
                                                    duration: 1,
                                                    onComplete: function () {
                                                        //                                        $('html').css('overflow', 'hidden');
                                                        //                                        const cursorCustomize = new Cursor();
                                                    }
                                                }
                                        );
                                    }
                                }
                        );

                        gsap.fromTo('.getintouch-contact h3',
                                {y: 20, opacity: 0},
                                {
                                    y: 0,
                                    opacity: 1,
                                    stagger: 0.2,
                                    duration: 2.5,
                                    onComplete: function () {
//                                        $('html').css('overflow', 'hidden');
//                                        const cursorCustomize = new Cursor();
                                    }
                                }
                        );

                        gsap.fromTo('.getintouch-contact .getintouch-item',
                                {y: 20, opacity: 0},
                                {
                                    y: 0,
                                    opacity: 1,
                                    stagger: 0.3,
                                    duration: 2.5,
                                    onComplete: function () {
//                                        $('html').css('overflow', 'hidden');
                                        const cursorCustomize = new Cursor();
                                    }
                                }
                        );

                        $('html').css('overflow', 'hidden');

                    }

//                    gsap.fromTo('.modal-contact-left',5,
//                            {scaleX:1.2, scaleY:1.2},
//                            {scaleX:1, scaleY:1}
//                    );
                });
            } else {
                gsap.to('.modal-popup', 1, {
                    xPercent: 0,
                    zIndex: 99999,
                    // duration: 2.5,
                    ease: "Power4.easeInOut",
                    onComplete: function () {
                        $('html').css('overflow', 'hidden');
//                        cursorCustomize.initHovers();
                        const cursorCustomize = new Cursor();
                    }
                });
            }
        });

        this.close();
        this.supportKey();
    },
    init_slider: function (obj) {
        var content_slider = {
            index_active: 0,
            next: function () {
                content_slider.index_active++;
                var current = parseInt(this.index_active) + 1;

                if (current >= modalPopup.sliders.length) {
                    this.index_active = parseInt(modalPopup.sliders.length) - 1;
                }
                console.log(this.index_active);
                content_slider.change('next');
            },
            prev: function () {
                this.index_active--;
                var current = parseInt(this.index_active) + 1;
                if (current <= 0) {
                    this.index_active = 0;
                }
                console.log(this.index_active);
                content_slider.change('prev');
            },
            change: function (action) {
                var obj_modal = $(modalPopup.sliders[this.index_active]);
                var modal_content = '';
                if (obj_modal.find('*[data-modal-content]').length > 0) {
                    modal_content = obj_modal.find('*[data-modal-content]').html();
                } else {
                    modal_content = obj_modal.parent().find('*[data-modal-content]').html();
                }

                var obj_slider = '.modal-popup[modal-type="popup-data"]';

                if (action == 'next') {
                    gsap.fromTo(obj_slider, {x: 0, opacity: 1}, {x: -200, opacity: 0});
                    $('.modal-popup .modal-popup-content .modal-body').html(modal_content);
                    gsap.fromTo(obj_slider, {x: 200, opacity: 0}, {x: 0, opacity: 1});
                } else {
                    gsap.fromTo(obj_slider, {x: 0, opacity: 1}, {x: 200, opacity: 0});
                    $('.modal-popup .modal-popup-content .modal-body').html(modal_content);
                    gsap.fromTo(obj_slider, {x: -200, opacity: 0}, {x: 0, opacity: 1});
                }
            },
        };

//            modalPopup.index_active = 0;
        var modal_content = '';
        if (obj.find('*[data-modal-content]').length > 0) {
            content_slider.index_active = obj.parent().index();
            modal_content = obj.find('*[data-modal-content]').html();
        } else {
            content_slider.index_active = obj.parent().parent().index();
            modal_content = obj.parent().find('*[data-modal-content]').html();
        }
        console.log(content_slider.index_active);
        $('.modal-popup .modal-popup-content .modal-body').html(modal_content);
        modalPopup.sliders = $('body').find('*[data-modal="popup-data"]');

        $('.modal-popup[modal-type="popup-data"]').on('click', '.action-arrow-prev', function (e) {
            e.preventDefault();
            content_slider.prev();
        }).on('click', '.action-arrow-next', function (e) {
            e.preventDefault();
            content_slider.next();
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

        var curr_count = parseInt(modalPopup.index_active) + 1;
        curr_count = curr_count.toString().padStart(2, '0');

        clone_markup = clone_markup.replace('[count]', curr_count);
        clone_markup = clone_markup.replace('[length]', modalPopup.galleries.length);

        $('.modal-popup .modal-popup-content .modal-body').html(clone_markup);

        // arrow click
        $('.modal-popup[modal-type="popup-gallery"]').on('click', '.action-arrow-prev', function (e) {
            e.preventDefault();
            modalPopup.prev();
        }).on('click', '.action-arrow-next', function (e) {
            e.preventDefault();
            modalPopup.next();
        })
    },
    setButtonClose: function (obj) {
        var obj_close = $('.modal-popup .modal-popup-content .modal-close');
        if (obj.data('close-default') != undefined) {
            obj_close.attr('data-image', 'images/modal/close-' + obj.data('close-default') + '.png');
        }

        obj_close.find('img').attr('src', obj_close.attr('data-image'));

        obj_close.on('mouseenter', function () {
            $(this).find('img').attr('src', $(this).attr('data-image-hover'));
        }).on('mouseleave', function () {
            $(this).find('img').attr('src', $(this).attr('data-image'));
        })
    },
    next: function () {
        modalPopup.index_active++;
        var current = parseInt(modalPopup.index_active) + 1;

        $('.modal-popup[modal-type="popup-gallery"] .action-arrow-prev').removeClass('disabled');

        if (current >= modalPopup.galleries.length) {
            modalPopup.index_active = parseInt(modalPopup.galleries.length) - 1;
            modalPopup.change('next');
            $('.modal-popup[modal-type="popup-gallery"] .action-arrow-next').addClass('disabled');
        } else {
            modalPopup.change('next');
        }
    },
    prev: function () {
        modalPopup.index_active--;
        var current = parseInt(modalPopup.index_active) + 1;

        $('.modal-popup[modal-type="popup-gallery"] .action-arrow-next').removeClass('disabled');

        if (current <= 0) {
            modalPopup.index_active = 0;
            modalPopup.change('prev');
            $('.modal-popup[modal-type="popup-gallery"] .action-arrow-prev').addClass('disabled');
        } else {
            modalPopup.change('prev');
        }
    },
    change: function (action) {
//            modalPopup.init_popup_gallery();
        var url = $(modalPopup.galleries[modalPopup.index_active]).attr('href');
        var obj_img = '.modal-popup[modal-type="popup-gallery"] .popup-gallery-thumbnail img';
        var obj_title = '.modal-popup[modal-type="popup-gallery"] .popup-gallery-info .popup-cation';
        var obj_count = '.modal-popup[modal-type="popup-gallery"] .popup-gallery-info .popup-action .action-number';

        if (action == 'next') {
            gsap.fromTo(obj_img, {x: 0, opacity: 1}, {x: -200, opacity: 0});
            $(obj_img).attr('src', url);
            gsap.fromTo(obj_img, {x: 200, opacity: 0}, {x: 0, opacity: 1});
        } else {
            gsap.fromTo(obj_img, {x: 0, opacity: 1}, {x: 200, opacity: 0});
            $(obj_img).attr('src', url);
            gsap.fromTo(obj_img, {x: -200, opacity: 0}, {x: 0, opacity: 1});
        }

        modalPopup.title_active = $(modalPopup.galleries[modalPopup.index_active]).data('title') != undefined ? $(modalPopup.galleries[modalPopup.index_active]).data('title') : $(modalPopup.galleries[modalPopup.index_active]).attr('title');
        $(obj_title).html(modalPopup.title_active);

        var curr_count = parseInt(modalPopup.index_active) + 1;
        curr_count = curr_count.toString().padStart(2, '0');
        $(obj_count).html(curr_count + ' / ' + modalPopup.galleries.length);

    },
    close: function () {
        $('#blocks-modal').on('click', '.modal-popup .modal-popup-content .modal-close', function (e) {
            e.preventDefault();
//                gsap.fromTo('.modal-popup', 1, {x: 0, 'z-index': 99999}, {x: '-100%', 'z-index': '-1', onComplete: function () {
//                        modalPopup.index_active = 0;
//                        $('html').css('overflow', 'inherit');
//                    }});

            if ($('.modal-popup').attr('modal-type') == "popup-contact" || $('.modal-popup').attr('modal-type') == "popup-menubar") {
                gsap.to('.modal-popup', 1, {
                    xPercent: 100,
                    ease: "Power4.easeInOut",
                    // 'z-index': '-1',
                    onComplete: function () {
                        modalPopup.index_active = 0;
                        $('html').css('overflow', 'inherit');
                    }
                });
            } else {
                gsap.to('.modal-popup', 1, {
                    xPercent: -100,
                    ease: "Power4.easeInOut",
                    // 'z-index': '-1',
                    onComplete: function () {
                        modalPopup.index_active = 0;
                        $('html').css('overflow', 'inherit');
                    }
                });
            }
        })
    },
    supportKey: function () {
        $(window).on('keyup', function (e) {
//                console.log(e.which);

            switch (e.which) {
                case 13:
                    break;
                    // esc      
                case 27:
                    $('.modal-popup .modal-popup-content .modal-close').trigger('click');
                    break;
                    //key next
                case 39:
                    modalPopup.next();
                    break;
                    //key prev
                case 37:
                    modalPopup.prev();
                    break;
            }
        })
    }
};

//    modalPopup.init();

// =================
// Tab Blocks
// =================
var tabBlocks = {
    selector: '#main .tab-page',
    arrow_markup: '<div class="tab-arrow-prev cvb"></div><div class="tab-arrow-next cvb"></div>',
    element_selector: '#main .tab-page ul > li',
    width_arrow: 60,
    width_scroll: 0,
    dropdown_leave: true,
    init: function () {
        if ($(this.selector).length > 0) {
            this.getWidthScroll();
            this.dropdown();
            /* reset arrow */
//            $(this.selector).find('.tab-arrow-prev').hide();
//            $(this.selector).find('.tab-arrow-next').hide();
//
//            if (this.width_scroll - this.width_arrow > $(this.selector).width()) {
////                    console.log($(this.selector).find('.tab-arrow-prev'));
//                if ($(this.selector).find('.tab-arrow-prev').length == 0) {
//                    $(this.selector + ' .container').append(this.arrow_markup);
//                    const cursorCustomize = new Cursor();
//                    cursorCustomize.initHovers();
//                }
//                $(this.selector).find('.tab-arrow-next').show();
//            }

//            $(this.selector).on('click', '.tab-arrow-prev', function () {
//                tabBlocks.prev();
//            }).on('click', '.tab-arrow-next', function () {
//                tabBlocks.next();
//            });
        }
    },
    getWidthScroll: function () {
        $(this.element_selector).each(function () {
            tabBlocks.width_scroll += $(this).width();
        })
    },
    dropdown: function () {

//        $(this.element_selector + ' > a').on('click', function (e) {
//            e.preventDefault();
//            if ($(this).parent().find(' > ul').length > 0) {
//                $(this).parent().find(' > ul').slideToggle();
//            }
//        });
        $(this.element_selector + ' > a').on('mouseenter', function () {
            if ($(this).parent().find(' > ul').length > 0) {
                $(this).parent().find(' > ul').slideToggle();
            }
        });
        $(this.element_selector).on('mouseleave', function () {
            if ($(this).parent().find(' > ul').length > 0) {
                $(this).parent().find(' > ul').slideToggle();
            }
        });
        return;
    },
    prev: function () {
        var widthul = $(tabBlocks.selector + ' ul').width();
        var left = $(tabBlocks.selector + ' ul').position().left;
        var scroll_left = (left * -1) - widthul;
//                    console.log('==============');
//                    console.log(left, widthul);
//                    console.log(scroll_left);
        if (-scroll_left > 0) {
            scroll_left = 0;
//                $(tabBlocks.selector).find('.tab-arrow-prev').hide();
        }
        gsap.fromTo($(tabBlocks.selector + ' ul'), 3, {x: left}, {x: -scroll_left, onComplete: function () {
                if (-scroll_left == 0) {
//                    $(tabBlocks.selector).find('.tab-arrow-prev').hide();
                }
            }});

//        if (left < tabBlocks.width_scroll) {
//            $(tabBlocks.selector).find('.tab-arrow-next').show();
//        }
    },
    next: function () {
        var widthul = $(tabBlocks.selector + ' ul').width();
        var left = $(tabBlocks.selector + ' ul').position().left;
        var scroll_left = widthul + (left * -1);

        if (scroll_left > tabBlocks.width_scroll) {
            scroll_left = tabBlocks.width_scroll;
//                $(tabBlocks.selector).find('.tab-arrow-next').hide();
        }
//                    console.log(scroll_left);
        gsap.fromTo($(tabBlocks.selector + ' ul'), 3, {x: left}, {x: -scroll_left, onComplete: function () {
                if (scroll_left == tabBlocks.width_scroll) {
//                    $(tabBlocks.selector).find('.tab-arrow-next').hide();
                }
            }});

//        if (left > 0) {
//            $(tabBlocks.selector).find('.tab-arrow-prev').show();
//        }
    }

};
$(window).resize(function () {
    tabBlocks.init();
})

jQuery(window).load(function () {
    tabBlocks.init();
    modalPopup.init();
    const cursorCustomize = new Cursor();

    if (jQuery('#main .tab-page ul li.active a').length > 0) {
        if (jQuery('#main .page-content .tab-content').length > 0) {
            var link = jQuery('#main .tab-page ul li.active a').attr('href');
            if (link != '#') {
                jQuery('#main .page-content .tab-content').fadeOut('medium', function () {
                    $(this).load(link, function () {
                        $(this).fadeIn('medium', function () {
                            modalPopup.init();
                            cursorCustomize.initHovers();
                        })
                    });
                })
            }
        }
    }

    jQuery('#main .tab-page ul li a').on('click', function (e) {
        e.preventDefault();
        $(this).parents('ul').find('li.active').removeClass('active');
        $(this).parent().addClass('active');

        var url = $(this).attr('href');
        if (url != '#') {
            jQuery('#main .page-content .tab-content').fadeOut('medium', function () {
                $(this).load(url, function () {
                    $(this).fadeIn('medium', function () {
                        modalPopup.init();
                        cursorCustomize.initHovers();
                    })
                });
            })
        }
    })
    
    jQuery('#main .tab-page ul').on("swipe move",function(){
      console.log('sdjsgdfjhgsh');
    });
    
    jQuery('.modal-popup').on('click', '.input-group .input-group-default .arrow', function (e) {                                           
        e.preventDefault();
        var obj_flag = jQuery(this).parent().next();
        if(obj_flag.css('display') == 'none'){
            obj_flag.slideDown();
        }else{
            obj_flag.slideUp();
        }                                            
        console.log(jQuery(this).parent().next());
        return false;
    }).on('click', '.input-group .input-left li', function () {
        var src = jQuery(this).find('img').attr('src');
        var text = jQuery(this).find('span:eq(1)').text();
        jQuery('.input-group .input-group-default .check-flag').attr('src', src);
//        jQuery('.input-group .input-group-default i').text(text);
        jQuery('.input-group .input-left').toggle();
    });    
})