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
    // ==========================================================
    // =================
    // Get In Touch Spin
    // =================
    var controller = new ScrollMagic.Controller();
    var heightMain = document.querySelector(".mainwrapper").offsetHeight;
    var scene = new ScrollMagic.Scene({
            triggerElement: ".mainwrapper",
            duration: heightMain,

        })
        .setTween(".get-in-touch", {
            rotation: -1800
        }) // trigger a TweenMax.to tween
        // .addIndicators({
        //     name: "Spinner"
        // }) // add indicators (requires plugin)
        .addTo(controller);
    // =================
})

class Cursor {
    constructor() {
        initPageTransitions();
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
            requestAnimationFrame(render);
        };
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
                x: box.left - box.width / 5,
                y: box.top + box.height / 2,
                // width: box.width,
                // height: box.height,
                width: 5,
                height: 5,
                opacity: 1,
                borderColor: "#b52126"
            });
        };

        const handleMouseLeave = () => {
            this.isStuck = false;
            gsap.to(this.outerCursor, 0.2, {
                width: this.outerCursorOriginals.width,
                height: this.outerCursorOriginals.height,
                opacity: 1,
                borderColor: "#b52126"
            });
        };

        const linkItems = document.querySelectorAll("#lang a");
        linkItems.forEach(item => {
            item.addEventListener("mouseenter", handleMouseEnter);
            item.addEventListener("mouseleave", handleMouseLeave);
        });

        const mainNavHoverTween = gsap.to(this.outerCursor, 0.3, {
            backgroundColor: "#fff",
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

        const mainNavLinks = document.querySelectorAll(".content--fixed a");
        mainNavLinks.forEach(item => {
            item.addEventListener("mouseenter", mainNavMouseEnter);
            item.addEventListener("mouseleave", mainNavMouseLeave);
        });
    }
}

const initPageTransitions = () => {
    setTimeout(() => document.body.classList.add("render"), 60);
    const navdemos = Array.from(document.querySelectorAll(".demos__links .demo"));
    const total = navdemos.length;
    const current = navdemos.findIndex(el =>
        el.classList.contains("demo--current")
    );
    const navigate = linkEl => {
        document.body.classList.remove("render");
        document.body.addEventListener(
            "transitionend",
            () => (window.location = linkEl.href)
        );
    };
    navdemos.forEach(link =>
        link.addEventListener("click", ev => {
            ev.preventDefault();
            navigate(ev.currentTarget);
        })
    );
    document.addEventListener("keydown", ev => {
        const keyCode = ev.keyCode || ev.which;
        let linkEl;
        if (keyCode === 37) {
            linkEl = current > 0 ? navdemos[current - 1] : navdemos[total - 1];
        } else if (keyCode === 39) {
            linkEl = current < total - 1 ? navdemos[current + 1] : navdemos[0];
        } else {
            return false;
        }
        navigate(linkEl);
    });
};

const cursorCustomize = new Cursor();