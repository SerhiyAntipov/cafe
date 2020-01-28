//++++++++++++++ INDEX JS ++++++++++++++++++++++++++++++++++++++++++++++
(function () {
    // get data menu from menu-data.json
    (function getAjaxJsonMenuData() {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                menuData = JSON.parse(xhr.response);
                sliderHeader(menuData);
                sliderBestPrice(menuData);
                ourMenu(menuData);
            }
        }
        xhr.open('GET', 'data/menu-data.json', true);
        xhr.send();
    })();

    // get data photo collage from photo-collage-data.json
    (function getAjaxJsonPhotoCollageData() {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                photoCollageData = JSON.parse(xhr.response);
                popupGallery(photoCollageData);
                photoswipe(photoCollageData);
            }
        }
        xhr.open('GET', 'data/photo-collage-data.json', true);
        xhr.send();
    })();
})();
(function () {
    let temp_date = new Date();
    let day = temp_date.getDate();
    let month = temp_date.getMonth() + 1;
    let year = temp_date.getYear() + 1900;
    let hours = temp_date.getHours();
    let minutes = temp_date.getMinutes();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    let currentDate = year + "-" + month + "-" + day;
    let maxDate = year + 1 + "-" + month + "-" + day;


    let formBookDate = document.querySelector('.book-date');
    formBookDate.setAttribute('value', currentDate);
    formBookDate.setAttribute('min', currentDate);
    formBookDate.setAttribute('max', maxDate);

    let currentTime = hours + ":" + minutes;
    let formBookTime = document.querySelector('.book-time');
    formBookTime.setAttribute('value', currentTime);


    formBookDate.addEventListener('input', function () {

        if (formBookDate.value == currentDate) {
            formBookTime.setAttribute('min', currentTime);
            formBookTime.setAttribute('value', currentTime);
        } else {
            formBookTime.setAttribute('min', '09:00');
            formBookTime.setAttribute('value', '10:00');
        }
    })

    formBookTime.addEventListener('input', function () {

        if (formBookDate.value == currentDate) {
            formBookTime.setAttribute('min', currentTime);
        } else {
            formBookTime.setAttribute('min', '09:00');
            formBookTime.setAttribute('value', '10:00');
        }
    })

})();
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
//
//++++++++++++++ OUR MENU ++++++++++++++++++++++++++++++++++++++++++++++
function ourMenu(menuData) {
    let foodsCategory = menuData.map(function (data, i, object) {
        return data['food-category'];
    })
    let ourMenuCategory = Array.from(new Set(foodsCategory));
    renderOurMenuList(ourMenuCategory);
    //   let allMenuBase
    //   allMenuBase = [];
    //   ourMenuCategory.forEach(function (content, x, object) {
    //       allMenuBase.push(menuData.filter(function (content, i, object) {
    //           if (content["food-category"] == ourMenuCategory[x]) return true
    //       }))
    //   })
};
// Render Our Menu List
function renderOurMenuList(ourMenuCategory) {

    let ourMenu = document.querySelector('.our-menu__list');
    let listsOurMenu = "";
    ourMenuCategory.forEach(function (data, i, object) {
        listsOurMenu += `
  <li class="our-menu__category-title" data-id="${i}">${data}</li> `
    });
    ourMenu.innerHTML = listsOurMenu;
    ourMenuCategoryActive(ourMenuCategory);
}
// Menu Category Active + Change Menu Category Active
function ourMenuCategoryActive(ourMenuCategory) {
    let ourMenuCategoryTitle = document.querySelectorAll('.our-menu__category-title');
    let categoryActive = 0;
    //   Category Menu Active 
    (function categoryMenuActive() {
        categoryActive = 0;
        let nameCategoryActive = 'mains';

        ourMenuCategoryTitle.forEach(function (categoryTitle, i) {
            if (categoryTitle.innerText.toLowerCase() == nameCategoryActive) {
                categoryActive = categoryTitle.getAttribute('data-id');
            }
        })
        ourMenuCategoryTitle[categoryActive].classList.toggle('active');
    })();
    // Change Menu Category Active
    (function changeMenuCategory() {
        ourMenuCategoryTitle.forEach(function (categoryTitle, i, element) {
            categoryTitle.addEventListener('click', function (event) {
                if (event.target.classList.contains('active') != true) {
                    event.target.classList.toggle('active');
                    element[categoryActive].classList.toggle('active');
                    categoryActive = event.target.getAttribute('data-id');
                    renderMenuPriceList(menuData, categoryActive, ourMenuCategory);
                }
            })
        });
        renderMenuPriceList(menuData, categoryActive, ourMenuCategory)
    })();
}

function renderMenuPriceList(menuData, categoryActive, ourMenuCategory) {
    let menuSelectCategory = menuData.filter(function (data, i) {
        if (data['food-category'] == ourMenuCategory[categoryActive]) return true
    })
    let ourMenuPrice = document.querySelector('.our-menu__category-wrapper');
    let ourMenuPriceList = "";
    menuSelectCategory.forEach(function (data, i) {
        ourMenuPriceList += `
  <div class="food__wrapper">
      <div class="food__info">
          <h4 class="food__title">
          ${data["food-name"]}
          </h4>
          <p class="food__sub-title p-lite">
          ${data["food-description"]}
              <span></span>
          </p>
      </div>
      <p class="food__price">$${Number(data["food-price"]+'00').toFixed(2)}</p>
  </div>`
    });
    ourMenuPrice.innerHTML = ourMenuPriceList;
}
// ++++++++++++++ PHOTOSWIPE ++++++++++++++++++++++++++++++++++++++++++++++
function photoswipe(photoCollageData) {
    let pswpElement = document.querySelectorAll('.pswp')[0];

    // build items array
    let items = [];

    if (photoCollageData.length > 0) {
        let width = 600;
        let height = 400;
        for (i = 0; i < photoCollageData.length; i++) {
            let itemsData = {};
            itemsData.src = photoCollageData[i]["img-src"];
            itemsData.w = width;
            itemsData.h = height;
            itemsData.msrc = photoCollageData[i]['img-msrc'];
            itemsData.title = photoCollageData[i]['img-title'];
            items.push(itemsData)
        }
    }
    // let items = [{
    //         src: '../img/photo-gallery/collage_01.jpg',
    //         w: 600,
    //         h: 400
    //     },
    //     {
    //         src: '../img/photo-gallery/collage_02.jpg',
    //         w: 600,
    //         h: 400
    //     }
    // ];

    // define options (if needed)
    let options = {
        // optionName: 'option value'
        // for example:
        index: 0 // start at first slide
    };

    // Initializes and opens PhotoSwipe
    document.querySelector('.swipe-all').addEventListener('click', function () {
        let gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    })

    // document.querySelector('.popup-gallery').addEventListener('click', function () {
    //     let gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    //     gallery.init();
    // })

};
//
//++++++++++++++ POPUP GALERY ++++++++++++++++++++++++++++++++++++++++++++++
function popupGallery(photoCollageData) {
    let popupPhotoGallery = document.querySelector('.popup-gallery');
    let popupPhotoGallerySlides = '';
    let maxPhoto = 5;

    if (photoCollageData.length > 0) {
        for (i = 0; i < photoCollageData.length && i < maxPhoto; i++) {
            popupPhotoGallerySlides += `
            <a href="${photoCollageData[i]["img-src"]}" title="${photoCollageData[i]['img-title']}">
                <img src="${photoCollageData[i]["img-src"]}" alt="${photoCollageData[i]['img-alt']}">
            </a>`
        }
    }

    popupPhotoGallery.innerHTML = popupPhotoGallerySlides;

    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            //   titleSrc: function (item) {
            //       return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
            //   }
        }
    });
};
//
//++++++++++++++ POPUP MAP WINDOW ++++++++++++++++++++++++++++++++++++++++++++++
(function () {
    $(function () {
        $('.popup-modal').magnificPopup({
            type: 'inline',
            preloader: false,
            focus: '#username',
            modal: true
        });
        $(document).on('click', '.popup-modal-dismiss', function (e) {
            e.preventDefault();
            $.magnificPopup.close();
        });
    });
})();
//
//++++++++++++++ SLIDER BEST PRICE  ++++++++++++++++++++++++++++++++++++++++++++++
// filter slider data
function sliderBestPrice(menuData) {
    let bestPrice = menuData.filter(function (data, i, object) {
        if (data["best-price"] == 'yes') return true
    })
    renderBestPriceSlider(bestPrice);
}
// render Best price slider
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
// best price slider ("Slick slider")
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
 //
 //++++++++++++++ SLIDER HEADER +++++++++++++++++++++++++++++++++++++++++++++++++++
 // filter slider data 
 function sliderHeader(menuData) {
     let headerSliderData = menuData.filter(function (data, i, object) {
         if (data["best-price"] == 'header') return true
     })
     renderHeaderSlider(headerSliderData);
 }
 // render header slider
 function renderHeaderSlider(headerSliderData) {
     let headerSliders = document.querySelector('.slider-header')
     let headerSlide = '';
     headerSliderData.forEach(function (data, i) {
         headerSlide +=
             `
 <div class="slider-header__slide">
     <img src="${headerSliderData[i]['url']}" alt="img ${headerSliderData[i]['food-name']}">
     <div class="container slider-header__text-container">
         <div class="slider-header__text">
             <h2 class="slider-header__title c-mongoose">${headerSliderData[i]['food-name']}</h2>
             <h5 class="slider-header__sub-title">${headerSliderData[i]['food-description']}</h5>
             <a href="#" class="btn btn-slider">See More</a>
         </div>
     </div>
 </div>
`
     });
     headerSliders.innerHTML = headerSlide;
     startHeaderSlider();
 }
 // header slider ("Slick slider")
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
 //
 //++++++++++++++ SMOOTH SCROLL +++++++++++++++++++++++++++++++++++++++++++++++++++
 (function () {
     let scroll = new SmoothScroll('a[href*="#"]', {
         ignore: '[data-scroll-ignore]',
         speed: 500,
         offset: 45
     });
 })();