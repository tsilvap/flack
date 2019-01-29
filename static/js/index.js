document.addEventListener('DOMContentLoaded', () => {
    // Wire up create channel button.
    document.querySelector('#create-channel').onclick = () => {
        // Toggle create channel form visibility.
        const display = document.querySelector('#create-channel-form').style.display;

        display = display === 'block' ? 'none' : 'block';
    };

    // Wire up create channel form.
    document.querySelector('#create-channel-form').onsubmit = () => {
        const channelName = document.querySelector('#channel-name').value;
        const xhr = new XMLHttpRequest();
        const data = new FormData();

        xhr.onload = function () {
            const data = JSON.parse(this.responseText);
            // Display error message.
            if (!data.success) {
                document.querySelector('#channel-name-taken').style.display = 'block';
            }
            // Otherwise, redirect to channel page.
            else {
                window.location.href = `/channel/${channelName}`;
            }
        };
        xhr.open('POST', '/create_channel');
        data.append('channel-name', channelName);
        xhr.send(data);
        return false; // Prevent default behavior.
    };

});
