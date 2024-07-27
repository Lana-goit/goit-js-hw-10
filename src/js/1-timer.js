import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// const startButton = document.querySelector('button[data-start]');
// const dateTimePicker = document.querySelector('#datetime-picker');
// const daysSpan = document.querySelector('[data-days]');
// const hoursSpan = document.querySelector('[data-hours]');
// const minutesSpan = document.querySelector('[data-minutes]');
// const secondsSpan = document.querySelector('[data-seconds]');
// startButton.disabled = 'true';
let userSelectedDate;
let timerInterval;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //     console.log(selectedDates[0]);
    //     if (selectedDates[0] < Date.now()) {

    //       iziToast.error({
    //         title: 'Error',
    //         message: 'Please choose a date in the future',
    //       });
    //       startButton.disabled = true;
    //     } else {
    //       startButton.disabled = false;
    //     }
    //   },
    // };
    userSelectedDate = selectedDates[0];
    const currentDate = new Date();

    if (userSelectedDate < currentDate) {
      window.alert('Please choose a date in the future');
      disableButton();
    } else {
      enableButton();
    }
  },
};
flatpickr('#datetime-picker', options);
function disableButton() {
  const button = document.querySelector('[data-start]');
  button.disabled = true;
}

function enableButton() {
  const button = document.querySelector('[data-start]');
  button.disabled = false;
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function updateTimer(days, hours, minutes, seconds) {
  document.querySelector('[data-days]').textContent = days;
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}
function startTimer() {
  disableButton();
  document.querySelector('#datetime-picker').disabled = true;

  let countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = userSelectedDate.getTime() - now;

    if (distance <= 0) {
      clearInterval(countdownInterval);
      document.querySelector('#datetime-picker').disabled = false;
      iziToast.show({
        title: 'Time is up!',
        message: 'The countdown has reached zero.',
        color: 'green',
        position: 'topCenter',
      });
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(distance);
    updateTimer(days, hours, minutes, seconds);
  }, 1000);
}
document.querySelector('[data-start]').addEventListener('click', startTimer);
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
// const addLeadingZero = value => String(value).padStart(2, '0');

// const updateTimer = () => {
//   const now = new Date();
//   const ms = userSelectedDate - now;

//   if (ms <= 0) {
//     clearInterval(timerInterval);
//     startButton.disabled = false;
//     dateTimePicker.disabled = false;
//     iziToast.info({
//       title: 'Info',
//       message: 'Countdown finished!',
//     });
//     return;
//   }

//   const { days, hours, minutes, seconds } = convertMs(ms);

//   daysSpan.textContent = addLeadingZero(days);
//   hoursSpan.textContent = addLeadingZero(hours);
//   minutesSpan.textContent = addLeadingZero(minutes);
//   secondsSpan.textContent = addLeadingZero(seconds);
// };

// startButton.addEventListener('click', () => {
//   if (userSelectedDate <= new Date()) {
//     iziToast.error({
//       title: 'Error',
//       message: 'Please choose a date in the future',
//     });
//     return;
//   }

//   startButton.disabled = true;
//   dateTimePicker.disabled = true;
//   timerInterval = setInterval(updateTimer, 1000);
//   updateTimer();
// });
