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
     * Parallax background image using GSAP and ScrollTrigger
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
     * init functions, setTimeOut to wait for html loading finish,
     * could be removed after merging step
     */
    setTimeout(function () {
        GSAP.parallaxBackground();
    }, 300);
});