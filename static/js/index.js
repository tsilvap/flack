document.addEventListener('DOMContentLoaded', function () {
    var displayName = localStorage.getItem('displayName');
    // Show and wire up display name prompt on first visit
    if (!displayName) {
        var displayNameViewElem = document.querySelector('#display-name-view');
        var formElem = document.querySelector('#form');
        displayNameViewElem.style.display = 'block';
        formElem.onsubmit = function () {
            var displayNameInputElem = document.querySelector('#display-name-input');
            displayName = displayNameInputElem.value;
            localStorage.setItem('displayName', displayName);
        };
    }
    // Show and wire up main view if display name has been selected
    else {
        var mainViewElem = document.querySelector('#main-view');
        var displayNameElem = document.querySelector('#display-name');
        mainViewElem.style.display = 'block';
        displayNameElem.innerHTML = "@" + displayName;
    }
    var createChannelElem = document.querySelector('#create-channel');
    var createChannelFormElem = document.querySelector('#create-channel-form');
    // Wire up create channel button
    createChannelElem.onclick = function () {
        // Toggle create channel form visibility
        createChannelFormElem.style.display =
            createChannelFormElem.style.display === 'block' ? 'none' : 'block';
    };
    // Wire up create channel form
    createChannelFormElem.onsubmit = function () {
        var httpRequest = new XMLHttpRequest();
        var channelNameElem = document.querySelector('#channel-name');
        var channelName = channelNameElem.value;
        var data = new FormData();
        httpRequest.onload = function () {
            var data = JSON.parse(this.responseText);
            // Display error message
            if (!data.success) {
                var channelNameTakenElem = document.querySelector('#channel-name-taken');
                channelNameTakenElem.style.display = 'block';
            }
        };
        httpRequest.open('POST', '/create_channel');
        data.append('channel-name', channelName);
        httpRequest.send(data);
        return false; // Prevent default behavior
    };
});
