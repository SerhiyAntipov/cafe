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