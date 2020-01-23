//
//++++++++++++++ MAIN MENU ++++++++++++++++++++++++++++++++++++++++++++++
(function () {
    // menu active
    let mainNavLink = document.querySelectorAll('.main-nav__link');
    let mainNavLinkActive = 0;

    mainNavLink.forEach(function (obj, i) {
        mainNavLink[i].addEventListener('click', function () {
            if (mainNavLink[i].classList.contains('main-nav__link-active') != true) {
                mainNavLink[i].classList.add('main-nav__link-active');
                mainNavLink[mainNavLinkActive].classList.toggle('main-nav__link-active');
                mainNavLinkActive = mainNavLink[i].getAttribute('data-main-nav-id')
            }
        });
    });
    // burger menu close
    const mainNav = document.querySelector('.main-nav__ul');
    mainNav.addEventListener('click', function (event) {
        if (event.srcElement.tagName == "A" || event.srcElement.localName == "a") {
            document.querySelector('#main-nav-call').checked = false;
        }
    });
    // bg header
    let color_header = 'rgba(20, 23, 35, 1)';
    let boxShadow_header = '0 3px 6px rgba(255, 255, 255, 0.2)';
    let header = document.querySelector('.main-nav');
    window.addEventListener('scroll', function positionPoint() {
        if (document.documentElement.scrollTop > header.clientHeight) {
            header.style.backgroundColor = color_header;
            header.style.boxShadow = boxShadow_header;
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.boxShadow = 'none';
        }
    });
})();