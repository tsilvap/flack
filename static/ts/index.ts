document.addEventListener('DOMContentLoaded', () => {
  let displayName = localStorage.getItem('displayName');

  // Show select display name prompt on first time visit
  if (!displayName) {
    const selectDisplayNameElem: HTMLDivElement = document.querySelector(
      '.select-display-name'
    );
    const formElem: HTMLFormElement = document.querySelector('#form');

    selectDisplayNameElem.style.display = 'block';

    formElem.onsubmit = () => {
      const displayNameElem: HTMLInputElement = document.querySelector(
        '#display-name'
      );
      const displayName = displayNameElem.value;

      localStorage.setItem('displayName', displayName);
    };
  }

  const mainViewElem: HTMLDivElement = document.querySelector('.main-view');
  const displayNameElem: HTMLParagraphElement = document.querySelector(
    '.display-name'
  );
  const createChannelElem: HTMLButtonElement = document.querySelector(
    '.create-channel'
  );
  const createChannelFormElem: HTMLFormElement = document.querySelector(
    '.create-channel-form'
  );

  // Show the main view
  mainViewElem.style.display = 'block';

  // Get and show display name
  displayName = localStorage.getItem('displayName');
  displayNameElem.innerHTML = `@${displayName}`;

  // Wire up create channel button
  createChannelElem.onclick = () => {
    // Toggle create channel form visibility
    createChannelFormElem.style.display =
      createChannelFormElem.style.display === 'block' ? 'none' : 'block';
  };
});
