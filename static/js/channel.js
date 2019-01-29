document.addEventListener('DOMContentLoaded', () => {
  const socket = io.connect(
    `http://${document.domain}:${window.location.port}`,
  );

  socket.on('connect', () => {
    // Emit message to channel.
    document.querySelector('#channel-message').onsubmit = function onSubmit() {
      const { channelName } = this.dataset;
      const displayName = localStorage.getItem('displayName');
      const messageText = document.querySelector('#message').value;

      socket.emit('message', { channelName, displayName, messageText });
      document.querySelector('#message').value = ''; // Clear input.

      return false; // Prevent default.
    };
  });
});
