//
//++++++++++++++ POPUP GALERY ++++++++++++++++++++++++++++++++++++++++++++++
function popupGallery(photoCollageData) {
    let popupPhotoGallery = document.querySelector('.popup-gallery');
    let popupPhotoGallerySlides = '';
    let maxPhoto = 6;

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