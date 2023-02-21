import {
  WiDaySunny,
  WiDayCloudy,
  WiDayFog,
  WiDayRain,
  WiDayLightning,
  WiDaySnowWind,
  WiCloudy,
} from "weather-icons-react";

const getWeatherIcon = (code) => {
  const size = 24;
  if (code === 0) {
    //Clear Sky
    return <WiDaySunny size={size} color="#555555" />;
  } else if (code === 1 || code === 2 || code === 3) {
    //Cloudy
    return <WiDayCloudy size={size} color="#555555" />;
  } else if (code === 45 || code === 48) {
    //Fog
    return <WiDayFog size={size} color="#555555" />;
  } else if (code === 61 || code === 63 || code === 65) {
    //Rainy
    return <WiDayRain size={size} color="#555555" />;
  } else if (code === 66 || code === 67) {
    //Heavy Rain
    return <WiDayLightning size={size} color="#555555" />;
  } else if (code === 71 || code === 73 || code === 75) {
    //Snow
    return <WiDaySnowWind size={size} color="#555555" />;
  } else {
    return <WiCloudy size={size} color="#555555" />;
  }
};

export default getWeatherIcon;
