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
        // Get messages.
        const msgs = JSON.parse(xhr.responseText);

        // Clear list of messages.
        const msgsElem = document.querySelector('#messages');
        while (msgsElem.firstChild) {
          msgsElem.removeChild(msgsElem.firstChild);
        }

        // (Re)render all messages in the DOM.
        msgs.forEach((msg) => {
          const messageElem = document.createElement('li');
          const firstDiv = document.createElement('div');
          const secondDiv = document.createElement('div');
          const authorElem = document.createElement('span');
          const dateElem = document.createElement('small');

          // Set up first div.
          authorElem.className = 'author';
          authorElem.innerHTML = msg.displayName;
          dateElem.className = 'date';
          dateElem.innerHTML = ` ${msg.date}`; // Space for display purposes.
          firstDiv.appendChild(authorElem);
          firstDiv.appendChild(dateElem);

          // Set up second div.
          secondDiv.innerHTML = msg.messageText;

          // Append divs to the message element.
          messageElem.appendChild(firstDiv);
          messageElem.appendChild(secondDiv);

          // Append message element to the list of messages.
          msgsElem.appendChild(messageElem);
        });
      };
      xhr.open('GET', `/messages/${channelName}`);
      xhr.send();
    }
  });
});
