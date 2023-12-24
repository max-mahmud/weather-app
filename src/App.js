import { useEffect, useState } from "react";
import Highlights from "./components/Highlights";
import Temperature from "./components/Temperature";
import MoreDetails from "./components/MoreDetails";

const App = () => {
  const [city, setCity] = useState("Dhaka");
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState(null);
  const [show, setShow] = useState(false);

  const currentDate = new Date(Date.now());
  const formattedDate = currentDate.toLocaleDateString("en-CA");

  useEffect(() => {
    let apiUrl = `https://api.weatherapi.com/v1/current.json?key=b8b430b3a4bd4f59ab8142324231512&q=${city}&aqi=no`;
    fetch(apiUrl, {
      headers: {
        Origin: "https://weatherapp2024.netlify.app",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
      })
      .catch((error) => console.log(error));
  }, [city]);
  useEffect(() => {
    let apiUrl = `https://api.weatherapi.com/v1/history.json?key=b8b430b3a4bd4f59ab8142324231512&q=${city}&dt=${formattedDate}`;
    fetch(apiUrl, {
      headers: {
        Origin: "https://weatherapp2024.netlify.app",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setHistory(data);
      })
      .catch((error) => console.log(error));
  }, [city]);

  let astro = history?.forecast?.forecastday[0]?.astro;
  let avgTemp = history?.forecast?.forecastday[0]?.day;

  return (
    <div className="bg-slate-800 min-h-screen pt-4 md:pt-0  flex justify-center flex-col ">
      <div className=" flex justify-center md:flex-row flex-col  items-center ">
        <div className="text-slate-200 text-2xl col-span-2">
          {weather && (
            <Temperature
              setCity={setCity}
              stats={{
                temp: weather?.current?.temp_c,
                condition: weather?.current?.condition?.text,
                icon: weather?.current?.condition?.icon,
                isDay: weather?.current?.is_day,
                location: weather?.location?.name,
                time: weather?.location?.localtime,
                country: weather?.location?.country,
                error: weather?.error,
              }}
            />
          )}
        </div>
        <div className="  p-10 grid grid-cols-2 gap-6 ">
          <h1 className="text-slate-200 text-2xl col-span-2">Today's Highlights</h1>
          {weather && (
            <>
              <Highlights
                stats={{
                  title: "Wind Status",
                  value: weather?.current?.wind_mph,
                  unit: "mph",
                  direction: weather?.current?.wind_dir,
                }}
              />
              <Highlights
                stats={{
                  title: "Humidity",
                  value: weather?.current?.humidity,
                  unit: "%",
                }}
              />
              <Highlights
                stats={{
                  title: "Visibility",
                  value: weather?.current?.vis_miles,
                  unit: "miles",
                }}
              />
              <Highlights
                stats={{
                  title: "Air Pressure",
                  value: weather?.current?.pressure_mb,
                  unit: "mb",
                }}
              />
            </>
          )}
        </div>
      </div>
      <button
        onClick={() => setShow(!show)}
        className="my-5 text-slate-200 hover:text-white hover:bg-slate-500 bg-slate-700 px-4 py-3 w-[120px] mx-auto"
      >
        {show ? "Show Less" : "Show More"}
      </button>
      {show && (
        <>
          <MoreDetails weather={weather} astro={astro} avgTemp={avgTemp} />
        </>
      )}
    </div>
  );
};

export default App;
