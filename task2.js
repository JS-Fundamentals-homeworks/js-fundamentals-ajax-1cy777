// На сторінці index.html знаходяться поля зазначені коментарем Task2
// При введені імені користувача в поле #userNameInput та натиску на кнопку
// #getUserButton потрібно зробити запит Fetch за посиланням - https://jsonplaceholder.typicode.com/users
// Віднайти користувача із введеним ім'ям, отримати місто його проживанння та
// відобразити у тезі #userCity
// Запустити програму потрібно за допомогою Live Server
// Перевірити правильність програми - команда node tests/task2.test.js

// task2.js

const input = document.getElementById('userNameInput');
const button = document.getElementById('getUserButton');
const citySpan = document.getElementById('userCity');

button.addEventListener('click', () => {
  const userName = input.value.trim();

  if (userName === '') {
    citySpan.textContent = 'Please enter a name.';
    return;
  }

  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network error');
      }
      return response.json();
    })
    .then(users => {
      const user = users.find(user => user.name.toLowerCase() === userName.toLowerCase());

      if (user) {
        citySpan.textContent = user.address.city;
      } else {
        citySpan.textContent = 'User not found.';
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      citySpan.textContent = 'Error fetching data.';
    });
});
