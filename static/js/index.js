document.addEventListener('DOMContentLoaded', function () {
    var displayName = localStorage.getItem('displayName');
    // Show select display name prompt on first time visit
    if (!displayName) {
        var selectDisplayNameElem = document.querySelector('.select-display-name');
        var formElem = document.querySelector('#form');
        selectDisplayNameElem.style.display = 'block';
        formElem.onsubmit = function () {
            var displayNameElem = document.querySelector('#display-name');
            var displayName = displayNameElem.value;
            localStorage.setItem('displayName', displayName);
        };
    }
    var mainViewElem = document.querySelector('.main-view');
    var displayNameElem = document.querySelector('.display-name');
    // Show the main view
    mainViewElem.style.display = 'block';
    // Get and show display name
    displayName = localStorage.getItem('displayName');
    displayNameElem.innerHTML = "@" + displayName;
});
