console.log('Loaded!');
const apiKey = 'f5b634be2902a2f2705ec97c6d2128c7';

const getLatLonFromName = function(location) {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=2&appid=${apiKey}`)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      try {
        console.log(data);
        console.log(`API string for ${location}: lat=${data[0].lat}&lon=${data[0].lon}`);
      }
      catch(error) {
        if (error.message.includes('undefined')) {
          console.log(`Empty response from API.`);
        } 
        console.log(error);
      }
    })
    .catch((error) => {
      console.log(error);
    })
}

const getWeather = () => {
}

getLatLonFromName('Toronto');