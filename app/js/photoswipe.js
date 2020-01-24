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
};