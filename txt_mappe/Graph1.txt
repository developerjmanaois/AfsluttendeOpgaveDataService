import React, { useEffect, useState } from 'react';
import useRequestData from '../../hooks/useRequestData';
import Loader from '../../components/Loader';
import Error from '../../components/Error';

const Graph = () => {

    // https://api.openweathermap.org/data/2.5/weather?zip=8000,dk&appid=d67effa013a7380f994c8d74b052d3d6

    const { makeRequest, isLoading, data, error } = useRequestData();

    const [ zip, setZip ] = useState("8000");
    const [ valid, setValid ] = useState( true );

    useEffect( () => {

        if ( valid === true ) {
            
            makeRequest( "https://api.energidataservice.dk/dataset/Elspotprices?offset=0&start=2023-01-01T00:00&end=2023-12-31T00:00&filter=%7B%22PriceArea%22:[%22dk1%22]%7D&sort=SpotPriceDKK%20DESC", "GET" )
            
        }

    }, [zip] )

  return (
    <div>
      
        { isLoading && <Loader /> }
        { error && <Error /> }

        <div className='grid grid-cols-2'>
            <div className='px-10 py-10'>
                <h1 className='mb-2'>Vejret for en udvalgt by - fx Grenå (8500)</h1>
                <input 
                type="text"
                value={ zip }
                onChange={ e => { setZip( e.target.value ); setValid( e.target.checkValidity() ) } }
                required
                pattern="[0-9]{4}"
                placeholder='tast et postnummer'
                className='w-full max-w-xs input input-bordered'
                />
            </div>
            
        </div>


    </div>
  )
}

export default Graph;