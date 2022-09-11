const refs = {
  bodyEl: document.querySelector('body'),
  startBtnEl: document.querySelector('[data-start]'),
  stopBtnEl: document.querySelector('[data-stop]'),
};

const DURATION = 1000;
let currentColor = null;
let timerID = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function addClassOnBody() {
  currentColor = getRandomHexColor();
  refs.bodyEl.style.backgroundColor = currentColor;
}

refs.startBtnEl.addEventListener('click', () => {
  timerID = setInterval(() => {
    addClassOnBody();
  }, DURATION);
  refs.startBtnEl.disabled = true;
});

refs.stopBtnEl.addEventListener('click', () => {
  clearInterval(timerID);
  refs.startBtnEl.disabled = false;
});
// console.log(refs.bodyEl);
// console.log(refs.startBtnEl);
// console.log(refs.stopBtnEl);
