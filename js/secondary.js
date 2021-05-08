$(function () {
    /**
     * load html into sections, for investor.html
     */
    $("section.our-funds").load("/partials/our-funds.html");
    $("section.pioneers").load("/partials/pioneers.html");
    $(".full-screen-video").load("/partials/full-screen-video.html");
    $(".our-team").load("/partials/our-team.html");


    // save all GSAP animations into one object
    let GSAP = {};

    /**
     * Parallax background image using GSAP and ScrollTrigger v1.1
     * add attribute [data-parallax="speed from 0 to 1"] to html element which has background image
     * https://codepen.io/GreenSock/pen/QWjjYEw
     */
    GSAP.parallaxBackground = function () {
        $('[data-parallax]').each(function () {
            let $this = $(this),
                speed = $this.attr('data-parallax'),
                start = $this.attr('data-parallax-start');

            // speed
            speed = speed !== "" ? parseFloat(speed) : .4;
            $this.attr('data-parallax', speed);

            // start
            start = typeof start !== "undefined" ? start : "top bottom";
            $this.attr('data-parallax-start', start);

            gsap.set($this, {backgroundPosition: '50% 0px'});
            gsap.to($this, {
                backgroundPosition: '50% ' + (-innerHeight / 2 * speed) + 'px',
                ease: "none",
                scrollTrigger: {
                    trigger: $this,
                    start: start,
                    end: "bottom top",
                    scrub: true,
                }
            });
        });
    };


    /**
     * Counter Effect using GSAP and ScrollTrigger v0.1
     * https://codepen.io/snorkltv/pen/NWRqmOv
     */
    GSAP.counterEffect = function (options) {
        $('[data-counter]').each(function () {
            let $this = $(this),
                settings = $.extend({
                    end: $this.attr('data-counter'),
                    duration: 2,
                    ease: 'power1',
                    increment: 1,
                }, options);

            if (typeof settings.end === "undefined") return;

            // register counter effect
            gsap.registerEffect({
                name: "counter",
                extendTimeline: true,
                defaults: {
                    end: 0,
                    duration: 2,
                    ease: "power1",
                    increment: 1,
                },
                effect: (targets, config) => {
                    let tl = gsap.timeline();
                    targets[0].innerText = targets[0].innerText.replace(/\,/g, '');

                    tl.to(targets, {
                        duration: config.duration,
                        innerText: config.end,
                        //snap:{innerText:config.increment},
                        modifiers: {
                            innerText: function (innerText) {
                                let num = gsap.utils.snap(config.increment, innerText).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                num = num.length === 1 ? "0" + num : num;
                                return num;
                            }
                        },
                        ease: config.ease
                    }, 0);

                    return tl;
                }
            });

            // set begin number to zero
            $this.text(0);

            // set timeline
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: $this,
                    start: "top bottom",
                    end: "bottom top",
                }
            });
            tl.from($this, {opacity: 0});
            tl.counter($this, {
                end: settings.end,
                increment: settings.increment,
                ease: settings.ease,
                duration: settings.duration
            }, 0);
        });
    };


    /**
     * Magnetic button using GSAP v2.0
     */
    GSAP.magneticButton = function (options) {
        $('[data-magnetic]').each(function () {
            let $this = $(this),
                settings = $.extend({
                    activeClass: 'magnetizing',
                    scale: 1,
                    onEnter: function (data) {
                    },
                    onExit: function (data) {
                    },
                }, options),
                isEnter = false,
                calculateDistance = function ($el, mouseX, mouseY) {
                    return Math.floor(Math.sqrt(Math.pow(mouseX - ($el.offset().left + ($el.width() / 2)), 2) + Math.pow(mouseY - ($el.offset().top + ($el.height() / 2)), 2)));

                },
                magnetize = function ($this, e) {
                    let mX = e.pageX, mY = e.pageY;
                    $this.each(function () {
                        let $this = $(this),
                            customDist = parseFloat($this.attr('data-magnetic')) * 20 || 100,
                            centerX = $this.offset().left + ($this.width() / 2),
                            centerY = $this.offset().top + ($this.height() / 2),
                            deltaX = Math.floor((centerX - mX)) * -0.45,
                            deltaY = Math.floor((centerY - mY)) * -0.45,
                            distance = calculateDistance($this, mX, mY);

                        if (distance < customDist) {
                            gsap.to($this, 0.3, {y: deltaY, x: deltaX, scale: settings.scale});

                            if (!isEnter) {
                                isEnter = true;
                                $this.addClass(settings.activeClass);
                                settings.onEnter({target: $this, y: deltaY, x: deltaX, scale: settings.scale});
                            }
                        } else {
                            gsap.to($this, 0.45, {y: 0, x: 0, scale: 1});

                            if (isEnter) {
                                isEnter = false;
                                $this.removeClass(settings.activeClass);
                                settings.onExit({target: $this, y: deltaY, x: deltaX, scale: settings.scale});
                            }
                        }
                    });
                };

            // init
            $this.css('display', 'inline-block');
            $(window).on('mousemove', function (e) {
                magnetize($this, e);
            });
        });
    };


    /**
     * Stagger lines effect using GSAP, SplitText and ScrollTrigger v1.0
     * GSAP.linesEffect({target:jQuery element});
     */
    GSAP.linesEffect = function (options) {
        let settings = $.extend({
            target: '', // jQuery element
            duration: 1.2,
            lineChildClass: 'line-child',
            lineParentClass: 'line-parent',
            trigger: '', // jQuery element, leave empty to use target as trigger
            triggerStart: 'top 80%',
            triggerEnd: 'bottom top',
            triggerMarkers: false,
            stagger: .05,
            rotation: '5deg',
        }, options);

        if (!settings.target.length) return;

        let childLines = new SplitText(settings.target, {type: "lines", linesClass: settings.lineChildClass}),
            parentLines = new SplitText(settings.target, {type: "lines", linesClass: settings.lineParentClass}),
            tl = gsap.timeline({
                scrollTrigger: {
                    trigger: settings.trigger.length ? settings.trigger : settings.target,
                    start: settings.triggerStart,
                    end: settings.triggerEnd,
                    markers: settings.triggerMarkers,
                }
            });

        gsap.set(parentLines.lines, {overflow: 'hidden'});
        gsap.set(childLines.lines, {transformOrigin: 'left top'});

        tl.staggerFromTo(childLines.lines, settings.duration,
            {autoAlpha: 0, y: '100%', rotation: settings.rotation, ease: "power4.out"},
            {autoAlpha: 1, y: 0, rotation: 0, ease: "power4.out"}, settings.stagger, 0);

        return tl;
    };


    /**
     * Init lines effect for all sections
     */
    GSAP.initAnimations = function () {
        // our fund
        $('section.our-funds').each(function () {
            let $wrapper = $(this);

            GSAP.linesEffect({
                target: $wrapper.find('.heading .sub-heading, .heading .heading_2'),
            });

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: $wrapper.find('.key-figures-list'),
                    start: 'top 90%',
                }
            });
            gsap.set($wrapper.find('.key-figures-item'), {overflow: 'hidden'});
            tl.staggerFromTo($wrapper.find('.key-figures-item .inner'), .8,
                {autoAlpha: 0, y: '70%'},
                {autoAlpha: 1, y: 0}, .06, 0);
        });

        // pioneers
        $('section.pioneers').each(function () {
            GSAP.linesEffect({
                target: $(this).find('.heading .sub-heading, .content .heading_2, .content .text, .content .text + a'),
                stagger: .08,
            });
        });

        // full screen video
        $('section.full-screen-video').each(function () {
            GSAP.linesEffect({
                target: $(this).find('.sub-heading'),
                triggerStart: 'top 90%',
            });
        });

        // our team
        $('section.our-team').each(function () {
            let $wrapper = $(this);

            GSAP.linesEffect({
                target: $wrapper.find('.heading .heading_2, .heading .text'),
            });
            GSAP.linesEffect({
                target: $wrapper.find('.slider-bottom .button'),
                triggerStart: 'top 90%',
            });

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: $wrapper.find('.slider-body'),
                    start: 'top 90%',
                }
            });
            gsap.set($wrapper.find('.team-item'), {overflow: 'hidden'});
            tl.staggerFromTo($wrapper.find('.team-item .team-inner'), 1,
                {autoAlpha: 0},
                {autoAlpha: 1}, .15, 0);
        });
    };


    /**
     * init functions, setTimeOut to wait for html finish loading,
     * could be removed after merging step
     */
    setTimeout(function () {
        GSAP.parallaxBackground();
        GSAP.counterEffect();
        GSAP.magneticButton({
            onEnter: function (data) {
                data.target.find('button').addClass('active');
            },
            onExit: function (data) {
                data.target.find('button').removeClass('active');
            },
        });

        GSAP.initAnimations();

        // our team slider
        $('section.our-team').each(function () {
            let $wrapper = $(this),
                $slider = $wrapper.find('.slider-body');

            $slider.slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                speed: 700,
                arrows: true,
                prevArrow: $wrapper.find('.prev'),
                nextArrow: $wrapper.find('.next'),
                dots: false,
                infinite: true,
                //autoplay: true,
                //autoplaySpeed: 3000,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 769,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 567,
                        settings: {
                            slidesToShow: 1,
                            centerMode: true,
                            centerPadding: '30px',
                        }
                    }
                ]
            });
        });

    }, 300);
});