import React, { useEffect, useState } from 'react';
import useRequestData from '../../hooks/useRequestData';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import Weathercard from './Weathercard';
import LeafletMap from '../../components/LeafletMap';

const Weather = () => {

    // https://api.openweathermap.org/data/2.5/weather?zip=8000,dk&appid=d67effa013a7380f994c8d74b052d3d6

    const { makeRequest, isLoading, data, error } = useRequestData();

    const [ zip, setZip ] = useState("8000");
    const [ valid, setValid ] = useState( true );

    useEffect( () => {

        if ( valid === true ) {
            
            makeRequest( "https://api.openweathermap.org/data/2.5/forecast?zip=" + zip + ",dk&units=metric&appid=d67effa013a7380f994c8d74b052d3d6", "GET" )
            
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
                { data && <Weathercard data={data} />}
            </div>
            <div className='py-14'><LeafletMap /></div>
        </div>


    </div>
  )
}

export default Weather;



// import React, { useEffect, useState } from 'react';
// import useRequestData from '../../hooks/useRequestData';
// import Loader from '../../components/Loader';
// import Error from '../../components/Error';
// import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
// import Weathercard from './Weathercard';
// import LeafletMap from '../../components/LeafletMap';

// const Vejret = () => {

//     // https://api.openweathermap.org/data/2.5/weather?zip=8000,dk&appid=d67effa013a7380f994c8d74b052d3d6

//     const { makeRequest, isLoading, data, error } = useRequestData();

//     const [ zip, setZip ] = useState("8000");
//     const [ valid, setValid ] = useState( true );

//     useEffect( () => {

//         if ( valid === true ) {
            
//             makeRequest( "https://api.openweathermap.org/data/2.5/forecast?zip=" + zip + ",dk&units=metric&appid=d67effa013a7380f994c8d74b052d3d6", "GET" )
            
//         }

//     }, [zip] )

//   return (
//     <div>
      
//         <h1 className='my-4'>Vejret for en udvalgt by - fx Grenå (8500)</h1>

//         { isLoading && <Loader /> }
//         { error && <Error /> }

//         <input 
//             type="text"
//             value={ zip }
//             onChange={ e => { setZip( e.target.value ); setValid( e.target.checkValidity() ) } }
//             required
//             pattern="[0-9]{4}"
//             placeholder='tast et postnummer'
//             className='w-full max-w-xs input input-bordered'
//         />

//         { data && <Weathercard data={data} />}

//         <LeafletMap />

//     </div>
//   )
// }

// export default Vejret;
