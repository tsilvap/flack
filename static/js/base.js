document.addEventListener('DOMContentLoaded', () => {
  let displayName = localStorage.getItem('displayName');

  if (!displayName) {
    // Prompt for display name if it isn't set.
    document.querySelector('#display-name-view').style.display = 'block';
    document.querySelector('#form').onsubmit = () => {
      displayName = document.querySelector('#display-name-input').value;
      localStorage.setItem('displayName', displayName);
    };
  } else {
    // Show main view if display name is already set.
    document.querySelector('#main-view').style.display = 'block';
    document.querySelector('#display-name').innerHTML = `@${displayName}`;
  }
});
