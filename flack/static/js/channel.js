/**
 * Display a list of messages in the channel page.
 * @param {Object[]} msgs List of messages to be displayed.
 * @param {string} msgs[].displayName The name of the author of the message.
 * @param {string} msgs[].messageText The body of the message.
 * @param {string} msgs[].date The date (actually, time) that the message was
 * sent, in format hh:mm AM/PM.
 */
function displayMessages(msgs) {
  // Clear list of messages.
  const msgsElem = document.querySelector('#messages');
  while (msgsElem.firstChild) {
    msgsElem.removeChild(msgsElem.firstChild);
  }

  // (Re)render all messages in the DOM.
  msgs.reverse().forEach((msg) => {
    const messageElem = document.createElement('li');
    const firstDiv = document.createElement('div');
    const secondDiv = document.createElement('div');
    const authorElem = document.createElement('span');
    const dateElem = document.createElement('small');

    // Only display message if body is non-empty.
    if (!msg.messageText.trim()) return;

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

  // Scroll down to the last message.
  document.querySelector('#channel-body').scrollTo(
    0, 1000000,
  );
}

/**
 * Fetch messages from a channel and display them in the page.
 * @param {string} channelName The name of the channel to fetch messages from
 * and display to.
 */
function fetchAndDisplayMessages(channelName) {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    // Get messages.
    const msgs = JSON.parse(xhr.responseText);
    displayMessages(msgs);
  };
  xhr.open('GET', `/messages/${channelName}`);
  xhr.send();
}

document.addEventListener('DOMContentLoaded', () => {
  const socket = io.connect(
    `${window.location.protocol}//${document.domain}:${window.location.port}`,
  );
  const { channelName } = document.querySelector('#channel-view').dataset;

  // Remember channel.
  localStorage.setItem('channelName', channelName);

  // Display past messages from channel.
  fetchAndDisplayMessages(channelName);

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
      fetchAndDisplayMessages(channelName);
    }
  });
});
