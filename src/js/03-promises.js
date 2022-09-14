import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delayField: document.querySelector('input[name="delay"]'),
  stepField: document.querySelector('input[name="step"]'),
  amountField: document.querySelector('input[name="amount"]'),
  submitBtn: document.querySelector('button[type="submit"]'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  // getFormData();

  let FIRSTDELAY = Number(refs.delayField.value);
  let DELAYSTEP = Number(refs.stepField.value);
  let AMOUNT = Number(refs.amountField.value);

  let counter = 0;

  let intervalID = setInterval(() => {
    if (counter === AMOUNT) {
      clearInterval(intervalID);
    }
    createPromise(counter, FIRSTDELAY)
      .then((position, delay) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${DELAYSTEP}ms`);
      })
      .catch((position, delay) => {
        Notify.failure(`❌ Rejected promise ${position} in ${DELAYSTEP}ms`);
      });
    counter += 1;
  }, DELAYSTEP);

  function createPromise(position, delay) {
    return new Promise(function (resolve, reject) {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        setTimeout(() => {
          resolve(position, delay);
        }, delay);
      } else {
        setTimeout(() => {
          reject(position, delay);
        }, delay);
      }
    });
  }
}

// ---------------------

// let AMOUNT = 3;
// let FIRSTDELAY = 1000;
// let DELAYSTEP = 200;
