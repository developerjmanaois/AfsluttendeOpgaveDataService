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

      {/* <img src="assets/images/udtalelser-bg.jpg" className='opacity-50 hover:opacity-100' alt="" />
      <h1>Home</h1> */}
      <div className="hero min-h-screen" style={{backgroundImage: 'url(assets/images/udtalelser-bg.jpg)'}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="text-left text-neutral-content">
          <div className="">
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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 max-w-7xl mx-auto pb-20">
        {data && data.records.map(p => 
            <div className="card card-compact w-96 bg-base-100 shadow-xl image-full" key={p.id}>
              {/* Map over images for each service */}
              {p.fields.image && p.fields.image.map(image => 
                <figure key={image.id}>
                  <img
                    src={image.url}
                    alt={image.filename}
                    width={image.thumbnails.large.width}
                    height={image.thumbnails.large.height}
                  />
                </figure>
              )}
              {/* Service details */}
              <div className="card-body place-self-center">
                <h2 className="font-semibold text-lg text-center">{p.fields.Name}</h2>  
              </div>
            </div>
          )}
          </div>
          {/* <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 max-w-7xl mx-auto pb-20">
          <div className="card w-96 bg-base-100 shadow-xl image-full">
            <figure>
              <img src="assets/images/ydelser/ydelser-2.jpg" alt="Shoes" />
            </figure>
            <div className="card-body place-self-center">
              <h2 className="font-semibold text-lg text-center">Anlæg af have</h2>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl image-full">
            <figure>
              <img src="assets/images/ydelser/ydelser-2.jpg" alt="Shoes" />
            </figure>
            <div className="card-body place-self-center">
              <h2 className="font-semibold text-lg text-center">Anlæg af have</h2>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl image-full">
            <figure>
              <img src="assets/images/ydelser/ydelser-2.jpg" alt="Shoes" />
            </figure>
            <div className="card-body place-self-center">
              <h2 className="font-semibold text-lg text-center">Anlæg af have</h2>
            </div>
          </div>
          
        </div> */}
        
      </div>

    </section>
  )
}

export default Home