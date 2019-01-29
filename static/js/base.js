document.addEventListener('DOMContentLoaded', () => {
    let displayName = localStorage.getItem('displayName');

    // Prompt for display name if it isn't set.
    if (!displayName) {
        document.querySelector('#display-name-view').style.display = 'block';
        document.querySelector('#form').onsubmit = () => {
            displayName = document.querySelector('#display-name-input').value;
            localStorage.setItem('displayName', displayName);
        };
    }

    // Show main view if display name is already set.
    else {
        document.querySelector('#main-view').style.display = 'block';
        document.querySelector('#display-name').innerHTML = `@${displayName}`;
    }
});
