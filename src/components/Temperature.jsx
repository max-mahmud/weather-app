import React from "react";
import { LuSun } from "react-icons/lu";
import { FaRegMoon } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";

const Temperature = ({ setCity, stats }) => {
  const handleCityChange = (e) => {
    if (e.target.value.length > 2) {
      setCity(e.target.value);
    } else {
      setCity("Dhaka");
    }
  };
  const get12HourFormat = (time) => {
    const hour = parseInt(time?.split(":")[0], 10);
    const amPm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:${time?.split(":")[1]} ${amPm}`;
  };
  const formattedTime = get12HourFormat(stats?.time?.split(" ")[1]);

  return (
    <>
      <div className="flex align-middle justify-center">
        <input
          type="text"
          className="bg-slate-600 border border-slate-500 text-slate-200 placeholder-slate-400 text-md focus:border-slate-400 block w-60 p-2 focus:outline-none"
          placeholder="Enter Your City Name"
          onChange={handleCityChange}
          defaultValue="Dhaka"
        />
        <div className="m-4">
          <GrLocation className="w-6 h-6 hoverStyle" />
        </div>
      </div>
      {stats.error ? (
        <div className="my-20 text-2xl">{stats?.error?.message}</div>
      ) : (
        <div>
          <div className="flex justify-center items-center gap-2 mt-7">
            <p className="font-semibold text-[55px] hoverStyle">
              {stats.temp}
              <span className="text-[33px] hoverStyle">°C</span>
            </p>
            <img src={stats.icon} alt="" />
          </div>

          <div className="flex justify-center text-slate-300 text-[30px] ">{stats?.condition}</div>

          <div className="flex justify-center gap-3 items-center text-4xl text-slate-200 mt-7">
            <span>{formattedTime}</span>
          </div>

          <div className="flex justify-center flex-col text-center text-slate-400 mt-5 text-[15px]">
            <span>Today . {stats?.time?.split(" ")[0]}</span>
            <span>
              {stats?.location} . {stats.country}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Temperature;
