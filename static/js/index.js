document.addEventListener('DOMContentLoaded', function () {
    var selectDisplayNameElem = document.querySelector('.select-display-name');
    var displayName = localStorage.getItem('displayName');
    if (!displayName) {
        selectDisplayNameElem.style.display = 'block';
        var formElem = document.querySelector('#form');
        formElem.onsubmit = function () {
            var displayNameElem = document.querySelector('#display-name');
            var displayName = displayNameElem.value;
            localStorage.setItem('displayName', displayName);
        };
    }
    var mainViewElem = document.querySelector('.main-view');
    mainViewElem.style.display = 'block';
    displayName = localStorage.getItem('displayName');
    var displayNameElem = document.querySelector('.display-name');
    displayNameElem.innerHTML = "@" + displayName;
});
