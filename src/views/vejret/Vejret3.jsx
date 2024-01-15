import React, { useEffect, useState } from 'react';
import useRequestData from '../../hooks/useRequestData';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import postnrJSON from './postnumre.json';
import Weathercard from './Weathercard';
import LeafletMap from '../../components/LeafletMap';

const Weather3 = () => {

    const { makeRequest, isLoading, data, error } = useRequestData();
    const { makeRequest: makeRequestDAWA, isLoading: isLoadingDAWA, data: dataDAWA, error: errorDAWA } = useRequestData();

    const [ zip, setZip ] = useState("8000");
    const [ valid, setValid ] = useState( true );

    useEffect( () => {

        if ( valid ) {
            
            makeRequest( "https://api.openweathermap.org/data/2.5/forecast?zip=" + zip + ",dk&units=metric&appid=d67effa013a7380f994c8d74b052d3d6", "GET" )
            
        }

    }, [zip] )

    useEffect( () => {

      makeRequestDAWA( "https://api.dataforsyningen.dk/postnumre/autocomplete?q=" + zip )

    }, [ zip ] )

  return (
    <div className='px-24 py-10'>
      
        <h1 className='my-4'>Vejret for en udvalgt by - fx Grenå (8500)</h1>

        { isLoading && <Loader /> }
        { error && <Error /> }

        <input 
            type="text"
            list='listPostnr'
            value={ zip }
            maxLength="4"
            onChange={ e => { setZip( e.target.value ); setValid( e.target.checkValidity() ) } }
            required
            pattern="[0-9]{4}"
            placeholder='tast et postnummer'
            className='w-full max-w-xs input input-bordered'
        />

        <datalist id='listPostnr'>

          {
              dataDAWA?.map( d =>
              
                  <option value={ d.postnummer.nr } key={ d.postnummer.nr }>
                      { d.tekst }
                  </option>

              )
          }

        </datalist>

        <div className='grid grid-cols-2 gap-5 content-center'>
            <div className='justify-center'>{ data && <Weathercard data={data} />}</div>

            <div className='py-36'>{ data && <LeafletMap coord={ [data.city.coord.lat, data.city.coord.lon] } info={data.list[0].weather[0].description}/>}</div>
        </div>

    </div>
  )
}

export default Weather3;
