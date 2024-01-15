import React from "react";

import { useState, useEffect } from "react";
import useRequestData from "../../hooks/useRequestData";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";


const EnergiData1 = () => {

const { data, isLoading, error, makeRequest } = useRequestData();

const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');
const [selectedPriceArea, setSelectedPriceArea] = useState('dk2');


// useEffect( () => {

//     makeRequest( "https://api.energidataservice.dk/dataset/Elspotprices?offset=0&start=2023-01-01T00:00&end=2023-12-31T00:00&filter=%7B%22PriceArea%22:[%22dk1%22]%7D&sort=SpotPriceDKK%20DESC" )

// }, [] )

const handleCalculation = () => {
  if (!startDate || !endDate || !selectedPriceArea) {
    // Handle the case where either date or price area is not selected
    return;
  }

  const filters = { PriceArea: [selectedPriceArea] };
  const formattedStartDate = `${startDate}T00:00`;
  const formattedEndDate = `${endDate}T23:59`;
  const sortOrder = 'asc'; // Set the default sort order (you can change it as needed)

  let endpoint = `https://api.energidataservice.dk/dataset/Elspotprices?offset=0&start=${formattedStartDate}&end=${formattedEndDate}&filter=${encodeURIComponent(
    JSON.stringify(filters)
  )}&sort=HourDK ${sortOrder.toUpperCase()}`;

  makeRequest(endpoint, 'GET', {
    'Content-Type': 'application/json',
    // Add any other headers as needed
  });
};

useEffect(() => {
  // Load default data or initial data when the component mounts
  handleCalculation();
}, []);

return (

    <div>

    <h1 className='my-6 text-3xl font-bold text-center'>Energy Prices</h1>

    { isLoading && <Loader /> }
    { error && <h2>Error ...</h2> }


  <div className='my-4 px-10'>
    <h3>
      <small>Data from your energy prices API:</small>
    </h3>
  </div>

  <div className='flex items center px-10 pb-20'>
    <div className='grid'>
      <label>Start Date:</label>
      <input
        type='date'
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className='input input-bordered w-200 max-w-xs mr-3'
      />
    </div>

    <div className='grid'>
      <label>End Date:</label>
      <input
        type='date'
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className='input input-bordered w-200 max-w-xs mr-3'
      />
    </div>

    <div className='grid'>
      <label>Price Area</label>
      <select
        value={selectedPriceArea}
        onChange={(e) => setSelectedPriceArea(e.target.value)}
        className='input input-bordered w-200 max-w-xs'
      >
        <option value='dk1'>DK1</option>
        <option value='dk2'>DK2</option>
        {/* Add other price areas if needed */}
      </select>
    </div>

    <div className='flex items-end'>
      <button onClick={handleCalculation} className='btn btn-active btn-secondary ml-3'>
      &#128176; Show
      </button>
    </div>
  </div>

  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 pb-24">
      { data && data.records.map( t =>
  
          <div key={t.HourDK} className="card w-150 bg-base-100 shadow-xl">

              <div className="card-body">
                  <h2 className="card-title">Date{ t.HourDK }</h2>
                  <p>PriceArea: { t.PriceArea }</p>
                  <p>Price DKK: { t.SpotPriceDKK }</p>
                  <p>Price EUR: { t.SpotPriceEUR }</p>
              </div>

          </div>
  
      ) }
  </div>

    </div>

    )

}
export default EnergiData1;
