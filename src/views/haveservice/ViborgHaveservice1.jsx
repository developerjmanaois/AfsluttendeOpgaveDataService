import React, { useEffect, useState } from 'react';
import useRequestData from '../../hooks/useRequestData';
import Loader from '../../components/Loader';


const ViborgHaveservice1 = () => {


  const { data: aboutUsData, isLoading: aboutUsLoading, error: aboutUsError, makeRequest: aboutUsMakeRequest } = useRequestData();

  const { data: servicesData, isLoading: servicesLoading, error: servicesError, makeRequest: servicesMakeRequest } = useRequestData();

  const { data: reviewsData, isLoading: reviewsLoading, error: reviewsError, makeRequest: reviewsMakeRequest } = useRequestData();

  const [randomOffset, setRandomOffset] = useState(0);

  useEffect(() => {

    aboutUsMakeRequest('http://localhost:5023/aboutus');
    
    servicesMakeRequest('http://localhost:5023/services');

    reviewsMakeRequest( 'http://localhost:5023/reviews' );

  }, []);

  // useEffect(() => {
  //   // When servicesData is available, set the random offset
  //   if (servicesData && servicesData.length > 1) {
  //     setRandomOffset(Math.floor(Math.random() * servicesData.length));
  //   }
  // }, [servicesData]);

  useEffect(() => {
    // When servicesData is available, set the random offset
    if (servicesData && servicesData.length > 1) {
      setRandomOffset(Math.floor(Math.random() * (servicesData.length - 1)));
    } else {
      // If there's only one or zero services, set randomOffset to 0 or handle it differently
      setRandomOffset(0);
    }
  }, [servicesData]);

  return (
    <div>
      { (aboutUsLoading || servicesLoading || reviewsLoading) && <Loader />}
      { (aboutUsError || servicesError || reviewsError) && <h2>Error ...</h2>}

      <div className='grid grid-cols-2 justify-center items-center'>
        <div className='py-16'>
          <div>
            <h1 className='text-4xl font-bold text-center mb-10'>
              Velkommen til <br />
              <span className='text-green-600 text-5xl'>Viborg Have Service</span>
            </h1>
          </div>
          <div className='max-w-screen-sm mx-auto'>
            {
              aboutUsData &&
              <div dangerouslySetInnerHTML={{ __html: aboutUsData.content }} className='pb-10'></div> 
            }
            <button className="btn bg-green-500"><a href="/viborghaveservice2">SE ALLE YDELSER</a></button>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 max-w-screen-xl mx-auto py-20'>
          {servicesData &&
            servicesData.slice(randomOffset, randomOffset + 2).map((t) => (
              <div key={t._id} className='card w-96  bg-slate-100 shadow-xl py-7'>
                <div className='py-6'>
                  <figure>
                    <a href='/'>
                      <img src={'http://localhost:5023/images/' + t.image} />
                    </a>
                  </figure>
                  <div className='card-body max-w-xs mx-auto'>
                    <h2 className='card-title '>
                      <a href='/'>{t.title}</a>
                    </h2>
                    <p className='py-4 font-medium'>{t.content}</p>
                    <p>Id: {t._id}</p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        {/* <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 max-w-screen-xl mx-auto py-20'>
              {servicesData &&
                servicesData.slice(0, 2).map((t) => (
                  <div key={t._id} className='card w-70 bg-base-100 shadow-xl'>
                    <div>
                      <figure>
                        <a href='/'>
                          <img src={'http://localhost:5023/images/' + t.image} />
                        </a>
                      </figure>

                      <div className='card-body'>
                        <h2 className='card-title'>
                          <a href='/'>{t.title}</a>
                        </h2>
                        <p>{t.content}</p>
                        <p>Id: {t._id}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div> */}
        {/* <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 max-w-screen-xl mx-auto py-20">
          { servicesData && servicesData.map( t =>
      
            <div key={t._id} className="card w-70 bg-base-100 shadow-xl">
                
              <div>
                <figure>
                    <a href="/"><img src={ "http://localhost:5023/images/" + t.image } /></a>
                </figure>
              
                
                <div className="card-body">
                  <h2 className="card-title"><a href="/">{ t.title }</a></h2>
                  <p>{ t.content }</p>
                  <p>Id: { t._id }</p>
                </div>
              </div>

            </div>
      
          ) }
        </div> */}
      </div>


      <div className="carousel w-full">
        {reviewsData &&
          reviewsData.map((review, index) => (
            <div key={index} id={`item${index + 1}`} className="bg-image carousel-item w-full">
              <div className='bg-text'>
                <div className='pt-4'>
                  <h2 className='border-b-8 border-green-500 w-40 mx-auto text-4xl leading-snug'>Kundeudtalelser</h2>
                </div>
                <div className='pt-6'>
                  <h3 className='text-xl max-w-4xl mx-auto'>{review.content}</h3>
                  <p className='mt-6 text-base'>-{review.author}</p>
                </div>
              <div className="flex justify-center items-end w-full py-2 gap-2">
                {reviewsData &&
                  reviewsData.map((_, index) => (
                    <a key={index} href={`#item${index + 1}`} className="dot"></a>
                  ))
                }
              </div>
              </div>
            </div>
          ))
        }
      </div>

      {/* <div className="carousel w-full">
        
          <div id="item1" className="bg-image carousel-item w-full">
          
          { reviewsData &&
            <div className='bg-text'>
              <p>{reviewsData[0].content}</p>
              <p>-{reviewsData[0].author}</p>
            </div>
          }
        </div> 
          <div id="item2" className="bg-image carousel-item w-full">
          
          { reviewsData &&
            <div className='bg-text'>
              <p>{reviewsData[1].content}</p>
              <p>-{reviewsData[1].author}</p>
            </div>
          }
        </div> 
          <div id="item3" className="bg-image carousel-item w-full">
          
          { reviewsData &&
            <div className='bg-text'>
              <p>{reviewsData[2].content}</p>
              <p>-{reviewsData[2].author}</p>
            </div>
          }
        </div> 
        
        
      </div> 
      <div className="flex justify-center w-full py-2 gap-2">
        <a href="#item1" className="btn btn-xs">1</a> 
        <a href="#item2" className="btn btn-xs">2</a> 
        <a href="#item3" className="btn btn-xs">3</a> 
      </div> */}
    </div>
  );
};

export default ViborgHaveservice1;