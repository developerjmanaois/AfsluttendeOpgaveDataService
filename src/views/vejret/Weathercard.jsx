import React from 'react';
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";

const Weathercard = ({ data }) => {
  return (
    
    <article className='w-3/4 mt-10 shadow-xl card bg-base-100'>
        <div className='card-body'>
            <h2 className='my-4 text-2xl font-bold'>Vejret for { data.name }</h2>

            <figure>
                <img src={"https://openweathermap.org/img/wn/" + data.list.weather[0].icon + ".png"}/>
            </figure>

            <ul className='ml-5 list-disc divide-y divide-gray-200'>
                <li className='py-4'>
                    Temperatur: { Math.round( data.list.main.temp ) } &deg;C
                </li>
                <li className='py-4'>
                    Vindhastighed: { Math.round( data.wind.speed ) } m/sek
                </li>
                <li className='py-4'>
                    Vindretning: { data.wind.deg } <FaArrowDownLong  style={{ transform: "rotate(" + data.wind.deg + "deg)" }}/>
                    {/* Vindretning: { data.wind.deg } <FaArrowUpLong  style={{ transform: `rotate(${ data.win.deg }deg)` }}/> */}
                </li>
                <li className='py-4'>
                    Solen står op kl: { new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) }
                </li>
                <li className='py-4'>
                    Solen gå ned kl: { new Date(data.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) }
                </li>
            </ul>
        </div>
    </article>
  )
}

export default Weathercard;
