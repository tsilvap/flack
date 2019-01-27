document.addEventListener('DOMContentLoaded', () => {
  const selectDisplayNameElem: HTMLDivElement = document.querySelector(
    '.select-display-name'
  );
  let displayName = localStorage.getItem('displayName');

  if (!displayName) {
    selectDisplayNameElem.style.display = 'block';

    const formElem: HTMLFormElement = document.querySelector('#form');

    formElem.onsubmit = () => {
      const displayNameElem: HTMLInputElement = document.querySelector(
        '#display-name'
      );

      const displayName = displayNameElem.value;
      localStorage.setItem('displayName', displayName);
    };
  }

  const mainViewElem: HTMLDivElement = document.querySelector('.main-view');

  mainViewElem.style.display = 'block';
  displayName = localStorage.getItem('displayName');

  const displayNameElem: HTMLParagraphElement = document.querySelector(
    '.display-name'
  );

  displayNameElem.innerHTML = `@${displayName}`;
});
