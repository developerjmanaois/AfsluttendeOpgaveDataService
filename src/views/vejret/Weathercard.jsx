import React from 'react';
import { FaArrowDownLong } from "react-icons/fa6";

const Weathercard = ({ data }) => {
  return (
    <div>
      {data.list.map((forecast, index) => (
        <article key={index} className='w-3/4 mt-10 shadow-xl card bg-base-100'>
          <div className='card-body'>
            <h2 className='my-4 text-2xl font-bold'>Vejret for {data.city.name}</h2>

            <figure>
              <img src={"https://openweathermap.org/img/wn/" + forecast.weather[0].icon + ".png"} alt={forecast.weather[0].description} />
            </figure>

            <ul className='ml-5 list-disc divide-y divide-gray-200'>
              <li className='py-4'>
                Date: {forecast.dt_txt}
              </li>
              <li className='py-4'>
                Temperatur: {Math.round(forecast.main.temp)} &deg;C
              </li>
              <li className='py-4'>
                Solen står op kl: {new Date(data.city.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </li>
              <li className='py-4'>
                Solen går ned kl: {new Date(data.city.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </li>
              <li className='py-4'>
                Vindhastighed: {Math.round(forecast.wind.speed)} m/sek
              </li>
              <li className='py-4'>
                Vindretning: {forecast.wind.deg} <FaArrowDownLong style={{ transform: "rotate(" + forecast.wind.deg + "deg)" }} />
              </li>
              <li className='py-4'>
                Luftfugtighed: {forecast.main.humidity}
              </li>
              <li className='py-4'>
                Lufttryk: {forecast.main.pressure}
              </li>
              <li className='py-4'>
                Description: {forecast.wind.deg}
              </li>
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Weathercard;
