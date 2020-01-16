  (function () {
      // scroll  smooth-------------------------------
      let scroll = new SmoothScroll('a[href*="#"]', {
          ignore: '[data-scroll-ignore]',
          speed: 500,
          offset: 45
      });

      // menu active -------------------------------
      let mainNavLink = document.querySelectorAll('.main-nav__link');
      let mainNavLinkActive = 0;
      const mainNav = document.querySelector('.main-nav__ul');
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
      mainNav.addEventListener('click', function (event) {
          if (event.srcElement.tagName == "A" || event.srcElement.localName == "a") {
              document.querySelector('#main-nav-call').checked = false;
          }
      });

      // bg header ---------------
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

      // get data menu from menu-data.json---------------
      (function getAjaxJsonMenuData() {
          const xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () {
              if (xhr.readyState === 4 && xhr.status === 200) {
                  menuData = JSON.parse(xhr.response);
                  dataHeaderSlider(menuData);
                  dataBestPrice(menuData);
              }
          }
          xhr.open('GET', 'data/menu-data.json', true);
          xhr.send();

      })();
  })();


  // HEADER SLIDER +++++++++++++++++++++++++++++++++++++++++++++++++++
  // filter slider data 
  function dataHeaderSlider(menuData) {
      let dataHeaderSlider = menuData.filter(function (data, i, object) {
          if (data["food-category"] == 'header') return true
      })
      renderHeaderSlider(dataHeaderSlider);
  }

  // render Best price slider
  function renderHeaderSlider(dataHeaderSlider) {
      let headerSliders = document.querySelector('.slider-header')
      let headerSlide = '';
      dataHeaderSlider.forEach(function (data, i) {
          headerSlide +=
              `
        <div class="slider-header__slide">
            <img src="${dataHeaderSlider[i]['url']}" alt="img ${dataHeaderSlider[i]['food-name']}">
            <div class="container slider-header__text-container">
                <div class="slider-header__text">
                    <h2 class="slider-header__title c-mongoose">${dataHeaderSlider[i]['food-name']}</h2>
                    <h5 class="slider-header__sub-title">${dataHeaderSlider[i]['food-description']}</h5>
                    <a href="#" class="btn btn-slider">See More</a>
                </div>
            </div>
        </div>
      `
      });
      headerSliders.innerHTML = headerSlide;
      startHeaderSlider();
  }

  // header slider ("Slick slider") -------------------------------
  function startHeaderSlider() {
      $('.slider-header').slick({
          arrows: true,
          autoplay: true,
          pauseOnHover: false,
          edgeFriction: '0.3',
          dots: false,
          autoplaySpeed: 4000,
          speed: 2000
      });
  };
  // END HEADER SLIDER ============================================


  // BEST PRICE SLIDER ++++++++++++++++++++++++++++++++++++++++++++++
  // filter slider data
  function dataBestPrice(menuData) {
      let bestPrice = menuData.filter(function (data, i, object) {
          if (data["best-price"] == 'yes') return true
      })
      renderBestPriceSlider(bestPrice);
  }

  // render Best price slider-------------
  function renderBestPriceSlider(bestPrice) {
      let bestPriceSliders = document.querySelector('.price-slider')
      let bestPriceSlide = '';
      bestPrice.forEach(function (data, i) {
          bestPriceSlide +=
              `
        <div class="price-slider__slide">
            <img src="${bestPrice[i]['url']}" alt="img ${bestPrice[i]['food-name']}">
            <div class="price-slider__text-container">
                <button class="btn btn-small">Read More</button>
                <p class="price-slider__name">${bestPrice[i]['food-name']}</p>
                <h4 class="price-slider__price">$${bestPrice[i]['food-price']}</h4>
            </div>
        </div>`
      });
      bestPriceSliders.innerHTML = bestPriceSlide
      startPriceSlider();
  }

  // best price slider ("Slick slider") -------------------------------
  function startPriceSlider() {
      $('.price-slider').slick({
          infinite: true,
          adaptiveHeight: true,
          edgeFriction: '0.5',
          slidesToShow: 5,
          slidesToScroll: 5,
          dots: true,
          arrows: true,
          responsive: [{
                  breakpoint: 980,
                  settings: {
                      infinite: true,
                      adaptiveHeight: true,
                      edgeFriction: '0.5',
                      slidesToShow: 4,
                      slidesToScroll: 4,
                      dots: true,
                  }
              },
              {
                  breakpoint: 768,
                  settings: {
                      infinite: true,
                      adaptiveHeight: true,
                      edgeFriction: '0.5',
                      slidesToShow: 3,
                      slidesToScroll: 3,
                      dots: true,
                  }
              },
              {
                  breakpoint: 480,
                  settings: {
                      infinite: true,
                      adaptiveHeight: true,
                      edgeFriction: '0.5',
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      dots: true,
                  }
              }
          ]
      });
  };
  // END BEST PRICE SLIDER ============================================