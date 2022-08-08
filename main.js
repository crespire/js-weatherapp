console.log('Loaded!');
const owmKey = 'f5b634be2902a2f2705ec97c6d2128c7';
const informationTarget = document.querySelector('#weather');
const inputButton = document.querySelector("input[type='submit']");
const locationInput = document.querySelector('#location');

inputButton.addEventListener('click', updateWeather);


async function locate(location) {
  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${owmKey}`);
  return await response.json();
}

async function getUserWeather() {
  if (window.navigator.geolocation) {
    const locationPermissionGranted = (position) => {
      console.log('Location permission granted.');
      let coords = [position.coords.latitude, position.coords.longitude];
      return coords;
    }

    const locationPermissionDenied = () => {
      console.log('Location permission denied.');
    }

    let result = await window.navigator.geolocation.getCurrentPosition(locationPermissionGranted, locationPermissionDenied);
    return result;
  } else {
    console.error('Location permission not supported.');
  }
}

async function fetchData(coords) {
  let [lat, lon] = coords;
  const response = await fetch(`http://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${owmKey}&units=${document.querySelector('input[name="units"]:checked').value}`);
  return await response.json();
}

async function updateWeather() {
  const location = locationInput.value;
  console.log(location);
  const data = await locate(location);
  coords = [data[0].lat, data[0].lon];
  console.log(coords);
  const result = await fetchData(coords);
  let message = [];
  let displayUnit = document.querySelector('input[name="units"]:checked').value == 'metric' ? 'C' : 'F';
  message.push(`Current temp: ${result.current.temp}${displayUnit}`);
  message.push(`Feels like: ${result.current.feels_like}${displayUnit}`);
  message.push(`Current conditions: ${result.current.weather[0].description}`);
  informationTarget.innerHTML = message.join('<br />');
};
