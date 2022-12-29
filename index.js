const getDate = () => {
  return new Date().toLocaleDateString();
};

const getWeatherData = (cityName) => {
  const weather = {};
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=d614a6d2644e3139e11a7e49350a8908`,
    { mode: 'cors' }
  )
    .then((response) => response.json())
    .then((data) => {
      weather.country = data.sys.country;
      weather.cityName = data.name;
      weather.date = getDate();
      weather.temperature = `${data.main.temp}°C`;
      weather.humidity = `${data.main.humidity}%`;
      weather.pressure = `${data.main.pressure}hPa`;
      weather.description = data.weather[0].description;
      weather.icon = data.weather[0].icon;
      return weather;
    })
    .catch((err) => console.log('OOPS, there is an error ' + err));
};
// getWeatherData('blida').then((obj) => console.log(obj));

const createWeatherCard = (data) => {
  const cardContainer = document.querySelector('.content');
  // creating the card container
  const weatherCard = document.createElement('div');
  weatherCard.classList.add('weather-card');
  cardContainer.appendChild(weatherCard);

  //first row
  const firstRow = document.createElement('div');
  firstRow.classList.add('first-row');
  weatherCard.appendChild(firstRow);

  // city and date
  const cityDateContainer = document.createElement('div');
  firstRow.appendChild(cityDateContainer);
  const cityName = document.createElement('p');
  cityName.classList.add('city-name');
  cityName.textContent = `${data.cityName}, ${data.country}`;
  const date = document.createElement('p');
  date.classList.add('date');
  date.textContent = data.date;
  cityDateContainer.append(cityName, date);

  // description
  const description = document.createElement('div');
  description.classList.add('description');
  firstRow.appendChild(description);

  // description icons
  const weatherIcon = document.createElement('img');
  weatherIcon.setAttribute('alt', 'weather-description');
  iconUrl = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
  weatherIcon.src = iconUrl;
  const weatherDescription = document.createElement('p');
  weatherDescription.textContent = data.description;
  description.append(weatherIcon, weatherDescription);

  // second row
  const secondRow = document.createElement('div');
  secondRow.classList.add('second-row');
  weatherCard.appendChild(secondRow);

  // temperature
  const tempContainer = document.createElement('div');
  tempContainer.classList.add('temperature');
  secondRow.appendChild(tempContainer);
  const temperature = document.createElement('p');
  temperature.textContent = data.temperature;
  tempContainer.appendChild(temperature);

  // details
  const detailsContainer = document.createElement('div');
  detailsContainer.classList.add('details');
  secondRow.appendChild(detailsContainer);
  const humidity = document.createElement('p');
  humidity.classList.add('humidity');
  humidity.textContent = data.humidity;
  const pressure = document.createElement('p');
  pressure.classList.add('pressure');
  pressure.textContent = data.pressure;
  detailsContainer.append(humidity, pressure);
};

const checkInputValidity = (input) => {
  searchBar = input;
  searchBar.setCustomValidity('Please Enter a valid city name');
  searchBar.reportValidity();
  setTimeout(() => {
    searchBar.setCustomValidity('');
  }, 2000);
};

const addEventToSearchBar = () => {
  const searchBar = document.querySelector('#search');
  const cardContainer = document.querySelector('.content');
  searchBar.addEventListener('change', () => {
    // removing old card
    if (cardContainer.children[0]) {
      cardContainer.children[0].remove();
    }
    // get data
    getWeatherData(searchBar.value).then((dataObj) => {
      // checking if there is data
      if (!dataObj) {
        checkInputValidity(searchBar);
        return;
      }
      // once data is ready show it
      createWeatherCard(dataObj);
    });
  });
};
addEventToSearchBar();
