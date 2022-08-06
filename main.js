console.log('Loaded!');
const owmKey = 'f5b634be2902a2f2705ec97c6d2128c7';

async function getLocationWeather(location) {
  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${owmKey}`);
  const responseJson = await response.json();
  return responseJson;
}

async function getUserWeather() {
  if (window.navigator.geolocation) {
    const locationPermissionGranted = (position) => {
      console.log('Location permission granted.');
      let coords = [position.coords.latitude, position.coords.longitude];
      console.log(coords);
      fetchData(coords);
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
  const response = await fetch(`http://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${owmKey}`);
}

// getUserWeather();