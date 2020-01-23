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