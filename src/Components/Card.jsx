import React, { useEffect, useState } from "react";
import axios from "axios";
import us from "../assets/usa.svg";
import es from "../assets/spain.svg";
const Card = ({ latitude, longitude, setLoader, setBackground }) => {
      const lenguages = [
            { title: "Weather App", text1: "Wind Speed: ", text2: "Clouds: ", text3: "Pressure: ", btn: "Change" },
            { title: "App del Clima", text1: "Velocidad del viento: ", text2: "Nubes: ", text3: "Presion: ", btn: "Cambiar" },
      ];
      const [weather, setWeather] = useState();
      const [len, setLen] = useState(true);
      const [temperature, setTemperature] = useState();
      const [grade, setGrade] = useState(true);
      const APIKEY = "1c8e7465cb762b6fe744f51be11186a9";
      const chooseImage = (item) => {
            if (item.includes("rain") || item.includes("lluvia")) {
                  setBackground(0);
            }
            if (item.includes("clear") || item.includes("cielo")) {
                  setBackground(1);
            }
            if (item.includes("cloud") || item.includes("nubes")) {
                  setBackground(2);
            }
            if (item.includes("storm") || item.includes("tormenta")) {
                  setBackground(3);
            }
      };
      useEffect(() => {
            if (latitude) {
                  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}&lang=${
                        len ? "en" : "es"
                  }`;
                  axios.get(URL)
                        .then((res) => {
                              setWeather(res.data);
                              const temp = {
                                    celcius: `${(res.data.main.temp - 273).toFixed(1)} C`,
                                    fahrenheit: `${(((res.data.main.temp - 273.15) * 9) / 5 + 32).toFixed(1)} F`,
                              };
                              chooseImage(res.data.weather[0].description);
                              setTemperature(temp);
                              setLoader(false);
                        })
                        .catch((error) => console.log(error));
            }
      }, [latitude, longitude, len]);
      const degree = () => {
            setGrade(!grade);
      };
      const choose = () => {
            setLen(!len);
            console.log(len);
      };
      return (
            <div className="card">
                  <div className="lenguage">
                        <img src={len ? es : us} alt="" onClick={choose} />
                  </div>
                  <h1>{len ? lenguages[0].title : lenguages[1].title}</h1>
                  <h2>
                        {weather?.name} , {weather?.sys.country}
                  </h2>
                  <div className="main">
                        <img src={weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="icon" />
                        <ul className="main_text">
                              <li key="1">{weather?.weather[0].description}</li>
                              <li key="2">
                                    <span>{len ? lenguages[0].text1 : lenguages[1].text1} </span>
                                    {weather?.wind.speed} m/s
                              </li>
                              <li key="3">
                                    <span>{len ? lenguages[0].text2 : lenguages[1].text2} </span>
                                    {weather?.clouds.all} %
                              </li>
                              <li key="4">
                                    <span>{len ? lenguages[0].text3 : lenguages[1].text3} </span>
                                    {weather?.main.pressure} hPa
                              </li>
                        </ul>
                  </div>
                  <h2>{grade ? temperature?.celcius : temperature?.fahrenheit} </h2>
                  <button onClick={degree}>
                        {len ? lenguages[0].btn : lenguages[1].btn}
                        {grade ? " F" : " C"}
                  </button>
            </div>
      );
};

export default Card;
