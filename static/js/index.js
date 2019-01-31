/**
 * Create a new channel and redirect to channel page.
 * @param {string} channelName Name of the channel
 */
function createChannel(channelName) {
  const xhr = new XMLHttpRequest();
  const data = new FormData();

  xhr.onload = () => {
    const res = JSON.parse(xhr.responseText);

    if (!res.success) {
      // Display error message.
      if (document.querySelector('#channel-name-taken')) {
        document.querySelector('#channel-name-taken').style.display = 'block';
      }
    } else {
      // Otherwise, redirect to channel page.
      window.location.href = `/channel/${channelName}`;
    }
  };
  xhr.open('POST', '/create_channel');
  data.append('channel-name', channelName);
  xhr.send(data);
}

document.addEventListener('DOMContentLoaded', () => {
  const lastVisited = localStorage.getItem('channelName');

  if (lastVisited && !window.location.href.includes('/channel')) {
    // Go to last visited channel.
    window.location.href = `/channel/${lastVisited}`;
  }

  if (document.querySelector('#create-channel')) {
    // Wire up create channel button.
    document.querySelector('#create-channel').onclick = () => {
      const form = document.querySelector('#create-channel-form');

      form.style.display = form.style.display === 'block' ? 'none' : 'block';
    };
    // Wire up create channel form.
    document.querySelector('#create-channel-form').onsubmit = () => {
      const channelName = document.querySelector('#channel-name').value;

      createChannel(channelName);
      return false; // Prevent default.
    };
  } else {
    // Wire up create-inexistent-channel button.
    document.querySelector('#create-inexistent-channel').onclick = function createInexistentChannel() {
      createChannel(this.dataset.channelName);
    };
  }
});
