document.addEventListener('DOMContentLoaded', () => {
  const lastVisited = localStorage.getItem('channelName');

  if (lastVisited) {
    // Go to last visited channel.
    window.location.href = `/channel/${lastVisited}`;
  }

  // Wire up create channel button.
  document.querySelector('#create-channel').onclick = () => {
    const form = document.querySelector('#create-channel-form');

    form.style.display = form.style.display === 'block' ? 'none' : 'block';
  };

  // Wire up create channel form.
  document.querySelector('#create-channel-form').onsubmit = () => {
    const channelName = document.querySelector('#channel-name').value;
    const xhr = new XMLHttpRequest();
    const data = new FormData();

    xhr.onload = () => {
      const res = JSON.parse(xhr.responseText);

      if (!res.success) {
        // Display error message.
        document.querySelector('#channel-name-taken').style.display = 'block';
      } else {
        // Otherwise, redirect to channel page.
        window.location.href = `/channel/${channelName}`;
      }
    };

    xhr.open('POST', '/create_channel');
    data.append('channel-name', channelName);
    xhr.send(data);

    return false; // Prevent default behavior.
  };
});
