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

  console.log('Messages displayed.');
}

/**
 * Fetch messages from a channel and display them in the page.
 * @param {string} channelName The name of the channel to fetch messages from
 * and display to.
 */
function fetchAndDisplayMessages(channelName) {
  const xhr = new XMLHttpRequest();

  console.log('Fetching messages...');

  xhr.onload = () => {
    console.log('Messages fetched, proceeding to display them.');

    // Get messages.
    const msgs = JSON.parse(xhr.responseText);
    displayMessages(msgs);
  };
  xhr.open('GET', `/messages/${channelName}`);
  xhr.send();
}

document.addEventListener('DOMContentLoaded', () => {
  const socket = io.connect(
    `http://${document.domain}:${window.location.port}`,
  );
  const { channelName } = document.querySelector('#channel-view').dataset;

  console.log(`DOM Content Loaded. socket = ${socket}`);

  // Remember channel.
  localStorage.setItem('channelName', channelName);

  // Display past messages from channel.
  fetchAndDisplayMessages(channelName);

  socket.on('connect', () => {
    console.log('Socket connected.');

    // Emit message to channel.
    document.querySelector('#channel-message').onsubmit = function onSubmit() {
      const displayName = localStorage.getItem('displayName');
      const messageText = document.querySelector('#message').value;

      socket.emit('message', { channelName, displayName, messageText });
      document.querySelector('#message').value = ''; // Clear input.

      console.log(`Message emmited, body = ${messageText}`);

      return false; // Prevent default.
    };
  });

  socket.on('message received', (data) => {
    console.log('Received ping back from server.');

    // If message is from this channel, update messages view.
    if (channelName === data.channelName) {
      console.log('Data is from this channel, proceeding to fetch messages.');

      fetchAndDisplayMessages(channelName);
    }
  });
});
