 //
 //++++++++++++++ SMOOTH SCROLL +++++++++++++++++++++++++++++++++++++++++++++++++++
 (function () {
     let scroll = new SmoothScroll('a[href*="#"]', {
         ignore: '[data-scroll-ignore]',
         speed: 500,
         offset: 45
     });
 })();