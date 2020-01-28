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