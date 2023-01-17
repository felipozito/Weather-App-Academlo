import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Components/Card";
import Loader from "./Components/Loader";
import rain from "./assets/rain.jpeg";
import sun from "./assets/sun.jpg";
import storm from "./assets/thunderstorm.jpg";
import cloud from "./assets/cloud.jpg";

function App() {
      const images = [rain, sun, storm, cloud];
      const [background, setBackground] = useState();
      const [coord, setCoord] = useState();
      const [loader, setLoader] = useState(true);
      useEffect(() => {
            const read = (position) => {
                  const coordinates = {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                  };
                  setCoord(coordinates);
            };
            navigator.geolocation.getCurrentPosition(read);
      }, []);
      console.log(background);
      const style = {
            backgroundImage: `url(${images[background]})`,
      };
      return (
            <div className="App" style={style}>
                  {loader ? <Loader /> : ""}
                  <Card latitude={coord?.lat} longitude={coord?.lon} setLoader={setLoader} setBackground={setBackground} />
            </div>
      );
}

export default App;
