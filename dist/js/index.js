$('.slider-header').slick({
    arrows: false,
    autoplay: true,
    edgeFriction: '1',
    dots: true,
    adaptiveHeight: true,
    autoplaySpeed: 4000,
    speed: 2000,
    zIndex: 1
});

(function () {
    let mainNavA = document.querySelectorAll('.nav-main-a');
    let active = 0;
    const navMainBurger = document.querySelector('.nav-main');

    // menu active -------------------------------
    mainNavA.forEach(function (obj, i) {
        mainNavA[i].addEventListener('click', function () {
            if (mainNavA[i].getAttribute('data-id') != active) {
                mainNavA[i].setAttribute('data-active', 'active');
                mainNavA[active].setAttribute('data-active', 'no-active');
                active = mainNavA[i].getAttribute('data-id')
            }
        });
    });


    // burger menu close ----------------------------
    navMainBurger.addEventListener('click', function () {
        document.querySelector('#nav-main-call').checked = false;
    });


    // bg header ---------------
    let header = document.querySelector('.header-main');
    window.addEventListener('scroll', function positionPoint() {
        if (document.documentElement.scrollTop > header.clientHeight) header.style.backgroundColor = '#3c3c3ca6';
        else header.style.backgroundColor = 'transparent';
    });
})();