import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');

form.addEventListener(
  'input',
  throttle(() => {
    const formDataInput = {
      email: emailInput.value,
      message: messageInput.value,
    };
    save('feedback-form-state', formDataInput);
  }, 500)
);

form.addEventListener('submit', event => {
  event.preventDefault();
  clear();
  console.log({
    email: emailInput.value,
    message: messageInput.value,
  });
});

function save(key, value) {
  try {
    const serializedData = JSON.stringify(value);
    localStorage.setItem(key, serializedData);
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const savedFormData = localStorage.getItem('feedback-form-state');
  if (savedFormData) {
    const formData = JSON.parse(savedFormData);
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  } else {
    emailInput.value = '';
    messageInput.value = '';
  }
});

const load = key => {
  try {
    const serializedData = localStorage.getItem(key);
    return serializedData === null ? undefined : JSON.parse(serializedData);
  } catch (err) {
    console.error(err);
  }
};

const clear = () => {
  localStorage.removeItem('feedback-form-state');
};
