 // slider header ("Slick slider") -------------------------------
 $('.slider-header').slick({
     arrows: false,
     autoplay: true,
     pauseOnHover: false,
     pauseOnDotsHover: true,
     edgeFriction: '0.3',
     dots: true,
     autoplaySpeed: 4000,
     speed: 2000,
     zIndex: 1
 });


 (function () {
     let mainNavLink = document.querySelectorAll('.main-nav__link');
     let mainNavLinkActive = 0;
     const navMain = document.querySelector('.main-nav__ul');
     // menu active -------------------------------
     mainNavLink.forEach(function (obj, i) {
         mainNavLink[i].addEventListener('click', function () {
             if (mainNavLink[i].classList.contains('main-nav__link-active') != true) {
                 mainNavLink[i].classList.add('main-nav__link-active');
                 mainNavLink[mainNavLinkActive].classList.toggle('main-nav__link-active');
                 mainNavLinkActive = mainNavLink[i].getAttribute('data-main-nav-id')
             }
         });
     });

     // burger menu close ----------------------------
     navMain.addEventListener('click', function (event) {
         if (event.srcElement.tagName == "A" || event.srcElement.localName == "a") {
             document.querySelector('#main-nav-call').checked = false;
         }

     });

     // bg header ---------------
     let color_black_opacity = '#00000070';
     let header = document.querySelector('.main-nav');
     window.addEventListener('scroll', function positionPoint() {
         if (document.documentElement.scrollTop > header.clientHeight) header.style.backgroundColor = color_black_opacity;
         else header.style.backgroundColor = 'transparent';
     });
 })();