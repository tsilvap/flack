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

  // Show the main view
  mainViewElem.style.display = 'block';

  // Get and show display name
  displayName = localStorage.getItem('displayName');
  displayNameElem.innerHTML = `@${displayName}`;
});
