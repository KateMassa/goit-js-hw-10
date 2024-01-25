import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', function () {
  // Enable the button when the form is valid
  const form = document.querySelector('.form');
  const submitButton = form.querySelector('button[type="submit"]');
  form.addEventListener('input', function () {
    submitButton.disabled = !form.checkValidity();
  });

  // Form submission handling
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const delayInput = form.querySelector('input[name="delay"]');
    const stateInputs = form.querySelectorAll('input[name="state"]');
    const selectedState = Array.from(stateInputs).find(input => input.checked);

    const delay = parseInt(delayInput.value);
    const state = selectedState ? selectedState.value : null;

    // Create and handle the promise
    const notificationPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else if (state === 'rejected') {
          reject(delay);
        }
      }, delay);
    });

    // Handle the promise fulfillment or rejection
    notificationPromise
      .then(delay => {
        iziToast.success({
          title: 'Success',
          message: `✅ Fulfilled promise in ${delay}ms`,
        });
      })
      .catch(delay => {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise in ${delay}ms`,
        });
      });
  });
});
