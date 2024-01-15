import React, { useEffect, useState } from 'react';
import useRequestData from '../../hooks/useRequestData';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import Weathercard from './Weathercard';
import LeafletMap from '../../components/LeafletMap';
import postnrJSON from './postnumre.json';

const Vejret3 = () => {
    const { makeRequest, isLoading, data, error } = useRequestData();
    const { makeRequest: makeRequestDAWA, isLoading: isLoadingDAWA, data: dataDAWA, error: errorDAWA } = useRequestData();

    const [zip, setZip] = useState("8000");
    const [valid, setValid] = useState(true);

    useEffect(() => {
        if (valid) {
            makeRequest("https://api.openweathermap.org/data/2.5/forecast?zip=" + zip + ",dk&units=metric&appid=d67effa013a7380f994c8d74b052d3d6", "GET");
        }
    }, [zip]);

    useEffect( () => {

      makeRequestDAWA( "https://api.dataforsyningen.dk/postnumre/autocomplete?q=" + zip )

    }, [ zip ] )

    return (
      <div>

        {isLoading || isLoadingDAWA && <Loader />}
        {error || errorDAWA && <Error />}

        <div className='grid grid-cols-2'>
          <div className='px-10 py-10'>
              
            <h1 className='my-4'>Vejret for en udvalgt by - fx Grenå (8500)</h1>
            
            <label for="listPostnr">Choose postcode:</label>
            <input
            type="text"
            list='listPostnr'
            value={zip}
            maxLength="4"
            onChange={e => {
                setZip(e.target.value);
                setValid(e.target.checkValidity());
            }}
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

            {data && 
              <div>
                  <h2>{data.city.name}, {data.city.country}</h2>
                  <p>Coordinates: {data.city.coord.lat}, {data.city.coord.lon}</p>
                  {/* Display other city information as needed */}
                  <Weathercard data={data} />
              </div>
            }
          </div>

          <div>{ data && <LeafletMap coord={ [data.city.coord.lat, data.city.coord.lon] } info={data.list[0].weather[0].description}/>}</div>
        
        </div>
      </div>
    );
}

export default Vejret3;
