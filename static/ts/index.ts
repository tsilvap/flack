document.addEventListener('DOMContentLoaded', () => {
  let displayName = localStorage.getItem('displayName');

  // Show and wire up display name prompt on first visit
  if (!displayName) {
    const displayNameViewElem: HTMLDivElement = document.querySelector(
      '#display-name-view'
    );
    const formElem: HTMLFormElement = document.querySelector('#form');

    displayNameViewElem.style.display = 'block';
    formElem.onsubmit = () => {
      const displayNameInputElem: HTMLInputElement = document.querySelector(
        '#display-name-input'
      );

      displayName = displayNameInputElem.value;
      localStorage.setItem('displayName', displayName);
    };
  }
  // Show and wire up main view if display name has been selected
  else {
    const mainViewElem: HTMLDivElement = document.querySelector('#main-view');
    const displayNameElem: HTMLParagraphElement = document.querySelector(
      '#display-name'
    );

    mainViewElem.style.display = 'block';
    displayNameElem.innerHTML = `@${displayName}`;
  }

  const createChannelElem: HTMLButtonElement = document.querySelector(
    '#create-channel'
  );
  const createChannelFormElem: HTMLFormElement = document.querySelector(
    '#create-channel-form'
  );

  // Wire up create channel button
  createChannelElem.onclick = () => {
    // Toggle create channel form visibility
    createChannelFormElem.style.display =
      createChannelFormElem.style.display === 'block' ? 'none' : 'block';
  };

  // Wire up create channel form
  createChannelFormElem.onsubmit = () => {
    const httpRequest = new XMLHttpRequest();
    const channelNameElem: HTMLInputElement = document.querySelector(
      '#channel-name'
    );
    const channelName = channelNameElem.value;
    const data = new FormData();

    httpRequest.onload = function() {
      const data = JSON.parse(this.responseText);

      // Display error message
      if (!data.success) {
        const channelNameTakenElem: HTMLElement = document.querySelector(
          '#channel-name-taken'
        );

        channelNameTakenElem.style.display = 'block';
      }
    };
    httpRequest.open('POST', '/create_channel');
    data.append('channel-name', channelName);
    httpRequest.send(data);

    return false; // Prevent default behavior
  };
});
