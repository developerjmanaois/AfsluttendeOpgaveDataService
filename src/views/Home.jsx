import React from 'react';
import { useEffect } from 'react';
import useRequestData from '../hooks/useRequestData';
import Loader from '.././components/Loader';


const Home = () => {

  const { data, isLoading, error, makeRequest } = useRequestData()

  useEffect( () => {

    makeRequest( "https://api.airtable.com/v0/appIzu5cUrVxMACN4/Table%201", "GET", null,

    { "Authorization": "Bearer " + import.meta.env.VITE_APP_AIRTABLEAPIKEY }
    
    )

  }, [] )

  return (

    <section>

      { isLoading && <Loader /> }
      { error && <h2>Error ...</h2> }

      <div className="hero min-h-screen" style={{backgroundImage: 'url(assets/images/udtalelser-bg.jpg)'}}>
        <div className="hero-overlay bg-opacity-20"></div>
        <div className="text-left text-neutral-content">
          <div className="shadow-xl">
            <span className='text-lg font-semibold'>Viborg Haveservice</span> <br />
            <h1 className="mb-10 text-6xl font-bold leading-tight">
              Fokus på god service <br /> & kvalitet
            </h1>
            <button className="btn  bg-green-500"><a href="/">Kontakt os</a></button>
          </div>
        </div>
      </div>

      <div>
        <h2 className='text-4xl font-bold text-center py-10'>YDELSER</h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 max-w-7xl mx-auto pb-20">
          {data && data.records.map(p => 
            <div className="container" key={p.id}>
              {/* Map over images for each service */}
              {p.fields.image && p.fields.image.map(image => 
                <figure key={image.id} className='object-cover'>
                  <img
                    src={image.url}
                    alt={image.filename}
                    width={image.thumbnails.large.width}
                    height={image.thumbnails.large.height}
                    className='object-fill h-64 w-full'
                  />
                </figure>
              )}
              {/* Service details */}
              <div className="content">
                <h2 className="font-semibold text-lg text-center">{p.fields.Name}</h2>  
              </div>
            </div>
          )}
        </div>   
      </div>

    </section>
  )
}

export default Home