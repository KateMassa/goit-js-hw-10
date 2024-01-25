import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Function to pad single digits with leading zero
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

document.addEventListener('DOMContentLoaded', function () {
  let userSelectedDate;

  // Initialize flatpickr
  const flatpickrInstance = flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];

      // Validate selected date
      if (userSelectedDate < new Date()) {
        document.querySelector('[data-start]').disabled = true;
        iziToast.warning({
          title: 'Warning',
          message: 'Please choose a date in the future',
        });
      } else {
        document.querySelector('[data-start]').disabled = false;
      }
    },
  });

  // Countdown timer
  function updateTimer() {
    const now = new Date();
    const timeDifference = userSelectedDate - now;

    // Check if the timer reached zero
    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      document.querySelector('[data-days]').textContent = '00';
      document.querySelector('[data-hours]').textContent = '00';
      document.querySelector('[data-minutes]').textContent = '00';
      document.querySelector('[data-seconds]').textContent = '00';
      iziToast.success({
        title: 'Success',
        message: 'Countdown finished!',
      });
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeDifference);

      // Update the timer values in the interface
      document.querySelector('[data-days]').textContent = addLeadingZero(days);
      document.querySelector('[data-hours]').textContent =
        addLeadingZero(hours);
      document.querySelector('[data-minutes]').textContent =
        addLeadingZero(minutes);
      document.querySelector('[data-seconds]').textContent =
        addLeadingZero(seconds);
    }
  }

  let timerInterval;

  document.querySelector('[data-start]').addEventListener('click', function () {
    // Start the timer
    timerInterval = setInterval(updateTimer, 1000);

    // Disable the button after clicking
    this.disabled = true;
  });
});

// Function to convert milliseconds to days, hours, minutes, and seconds
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
