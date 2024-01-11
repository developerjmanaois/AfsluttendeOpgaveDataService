'use client'

import React, { useEffect } from 'react';
import useRequestData from '../../hooks/useRequestData';
import Loader from '../../components/Loader';
import { FaRegCircle } from 'react-icons/fa';
import parse from 'react-html-parser';


const ViborgHaveservice1 = () => {

  const { data: aboutUsData, isLoading: aboutUsLoading, error: aboutUsError, makeRequest: aboutUsMakeRequest } = useRequestData();

  const { data: servicesData, isLoading: servicesLoading, error: servicesError, makeRequest: servicesMakeRequest } = useRequestData();

  useEffect(() => {
    aboutUsMakeRequest('http://localhost:5023/aboutus');
    servicesMakeRequest('http://localhost:5023/services');
  }, []);

  return (
    <div>
      { (aboutUsLoading || servicesLoading) && <Loader />}
      { (aboutUsError || servicesError) && <h2>Error ...</h2>}

      <div className='grid grid-cols-1 justify-center'>
        <div className='py-10'>
          <div>
            <h1 className='text-4xl font-bold text-center mb-10'>
              Velkommen til <br />
              <span className='text-green-600 text-5xl'>Viborg Have Service</span>
            </h1>
          </div>
          <div className='max-w-screen-sm mx-auto'>
            {aboutUsData && <h4 className='pb-10'>{parse(aboutUsData.content)}</h4>}
            <button className="btn bg-green-500"><a href="/viborghaveservice2">SE ALLE YDELSER</a></button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4 max-w-screen-xl mx-auto py-20">
        { servicesData && servicesData.map( t =>
    
          <div key={t._id} className="card w-70 bg-base-100 shadow-xl">
              
            <div>
              <figure>
                  <img src={ "http://localhost:5023/images/" + t.image } />
              </figure>
            
              
              <div className="card-body">
                <h2 className="card-title">{ t.title }</h2>
                <p>{ t.content }</p>
                <p>Id: { t._id }</p>
              </div>
            </div>

          </div>
    
        ) }
      </div>
  
    </div>
  );
};

export default ViborgHaveservice1;