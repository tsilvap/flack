document.addEventListener('DOMContentLoaded', () => {
  const socket = io.connect(
    `http://${document.domain}:${window.location.port}`,
  );
  const { channelName } = document.querySelector('#channel-view').dataset;

  socket.on('connect', () => {
    // Emit message to channel.
    document.querySelector('#channel-message').onsubmit = function onSubmit() {
      const displayName = localStorage.getItem('displayName');
      const messageText = document.querySelector('#message').value;

      socket.emit('message', { channelName, displayName, messageText });
      document.querySelector('#message').value = ''; // Clear input.

      return false; // Prevent default.
    };
  });

  socket.on('message received', (data) => {
    // If message is from this channel, update messages view.
    if (channelName === data.channelName) {
      const xhr = new XMLHttpRequest();

      xhr.onload = () => {
<<<<<<< HEAD
        const messages = JSON.parse(xhr.responseText);


        // TODO: Display received messages.
=======
        // TODO: Handle received messages.
        const messages = JSON.parse(xhr.responseText);

        console.log(messages);
>>>>>>> b806bd02bfc1fcb614cefccf04a55ecdc178df41
      };
      xhr.open('GET', `/messages/${channelName}`);
      xhr.send();
    }
  });
});
