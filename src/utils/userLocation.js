const getWeatherAPIURL = () => {
  let lat = 41.881832;
  let long = -87.623177;

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
    });
  }
  return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&temperature_unit=fahrenheit&hourly=temperature_2m`;
};

export default getWeatherAPIURL;
