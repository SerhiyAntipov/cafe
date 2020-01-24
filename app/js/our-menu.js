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