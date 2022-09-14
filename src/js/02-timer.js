import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  dateInputEl: document.getElementById('datetime-picker'),
  startBtnEl: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minsEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};
refs.startBtnEl.disabled = true;

// console.dir(refs.dateInputEl);
// console.log("КНОПКА", refs.startBtnEl);

// refs.dateInputEl.addEventListener('input', () => {console.log(refs.dateInputEl.value)});

let finalDate = null;
// обьект настроек выбора конечной даты
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //   console.log(selectedDates[0]);
    let nowDateIs = options.defaultDate.getTime();
    let selectDateIs = selectedDates[0].getTime();
    if (selectDateIs < nowDateIs) {
      window.alert('Please choose a date in the future');
    } else {
      refs.startBtnEl.disabled = false;
      finalDate = selectDateIs;
      return finalDate;
    }
  },
};
//вызов библиотеки
flatpickr(refs.dateInputEl, options);

// console.log("today is", options.defaultDate);

// console.log("selected date", options.onClose());

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

const timer = {
  start() {
    const startTime = Date.now();

    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const leftToDate = finalDate - currentTime;
      // console.log("после функции", timeComponents);
      // console.log(currentTime - startTime);
      // console.log("FinalDate", finalDate);
      const dateArray = convertMs(leftToDate);
      console.log('back count', convertMs(leftToDate));
      refs.daysEl.textContent = dateArray.days;
      refs.hoursEl.textContent = dateArray.hours;
      refs.minsEl.textContent = dateArray.minutes;
      refs.secondsEl.textContent = dateArray.seconds;
    }, 1000);
  },
};

refs.startBtnEl.addEventListener('click', () => {
  timer.start();
  refs.startBtnEl.disabled = true;
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
