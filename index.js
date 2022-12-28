const getDate = () => {
  return new Date().toLocaleDateString();
};
console.dir(getDate());

const getWeatherData = (cityName) => {
  const weather = {};
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=d614a6d2644e3139e11a7e49350a8908`,
    { mode: 'cors' }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      weather.country = data.sys.country;
      weather.cityName = data.name;
      weather.date = getDate();
      weather.temperature = `${data.main.temp}°C`;
      weather.humidity = `${data.main.humidity}%`;
      weather.pressure = `${data.main.pressure}hPa`;
      weather.description = data.weather[0].description;
      return weather;
    })
    .catch((err) => console.log('aaaaaaah' + err));
};

// getWeatherData('blida').then((obj) => console.log(obj));

const addEventToSearchBar = () => {
  const searchBar = document.querySelector('#search');
  const displayWeather = () => {
    getWeatherData(searchBar.value).then((obj) => {
      console.log(obj)

      //TODO create the weather card
      const weatherCard = document.createElement('div');
    });
  };
  searchBar.addEventListener('change', displayWeather);
};
addEventToSearchBar();
