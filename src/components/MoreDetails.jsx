import React from "react";

const MoreDetails = ({ weather, astro, avgTemp }) => {
  return (
    <div className=" mb-8">
      <div className="flex justify-center flex-wrap md:flex-row items-center ">
        <span className="bg-slate-600 hoverStyle2 py-8 px-2 text-center text-slate-200 w-[200px] border border-slate-500">
          <strong>{"FeelsLike"}:</strong> {weather?.current?.feelslike_c}
          <span>°C</span>
        </span>
        <span className="bg-slate-600 hoverStyle2 py-8 px-2 text-center text-slate-200 w-[200px] border border-slate-500">
          <strong>{"FeelsLike"}:</strong> {weather?.current?.feelslike_f}
          <span>°f</span>
        </span>
        <span className="bg-slate-600 hoverStyle2 py-8 px-2 text-center text-slate-200 w-[200px] border border-slate-500">
          <strong>{"AvgTemp"}:</strong> {avgTemp?.avgtemp_c}
          <span>°C</span>
        </span>
        <span className="bg-slate-600 hoverStyle2 py-8 px-2 text-center text-slate-200 w-[200px] border border-slate-500">
          <strong>{"AvgTemp"}:</strong> {avgTemp?.avgtemp_f}
          <span>°f</span>
        </span>
      </div>
      <div className="flex justify-center flex-wrap md:flex-row items-center  mt-7">
        {astro &&
          Object.entries(astro)
            .slice(0, 4)
            .map(([key, value]) => (
              <div
                key={key}
                className="bg-slate-600 py-8 px-2 hoverStyle2 text-center text-slate-200 w-[200px] border border-slate-500"
              >
                <strong>{key}:</strong> {value}
              </div>
            ))}
      </div>
    </div>
  );
};

export default MoreDetails;
