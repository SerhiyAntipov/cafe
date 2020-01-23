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
    let currentTime = hours + ":" + minutes;
    document.querySelector('.book-date').setAttribute('value', currentDate);
    document.querySelector('.book-time').setAttribute('value', currentTime);

})();