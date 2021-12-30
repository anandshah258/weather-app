const weatherForm = document.querySelector('form');
const search = weatherForm['address'];
const message1 = document.getElementById('message1');
const message2 = document.getElementById('message2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(`/weather?address=${search.value}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) message1.textContent = data.error;
      else {
        message1.textContent = data.location;
        message2.textContent = data.forecast;
      }
    })
    .catch((err) => console.log(err));
  message1.textContent = 'Loading...';
  message2.textContent = '';
})