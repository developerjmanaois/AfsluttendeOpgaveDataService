import React, { useEffect, useState } from 'react';
import useRequestData from '../../hooks/useRequestData';
import Loader from '../../components/Loader';
import { formatDistanceToNow } from 'date-fns';
import { da } from 'date-fns/locale';
import newsParam from './newsapi_requestparameters.json'


const Nyheder = () => {

  const { isLoading, data, error, makeRequest } = useRequestData();

  const [ searchKey, setSearchKey ] = useState( "denmark" );

  const [ language, setLanguage ] = useState( "en" );

  const [sortOrder, setSortOrder] = useState('publishedAt'); 

  const truncateText = (text, maxLength) => {
    // Check if the text is null or undefined
    if (text == null) {
      return '';
    }

    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  useEffect( () => {

    makeRequest( "https://newsapi.org/v2/everything?q=" + searchKey + "&pageSize=50&language=" + language + "&apiKey=3ce4eed9a78b4a22aadff41589164f32", "GET" )
    // makeRequest( `https://newsapi.org/v2/everything?q=${searchKey}&pageSize=50&language=en&apiKey=3ce4eed9a78b4a22aadff41589164f32`, "GET" )

  }, [language, sortOrder] )

  const handleSearch = e => {

    e.preventDefault()

    makeRequest( "https://newsapi.org/v2/everything?q=" + searchKey + "&pageSize=50&language=" + language + "&apiKey=3ce4eed9a78b4a22aadff41589164f32", "GET" )

  }

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortedArticles = data?.articles?.sort((a, b) => {
    if (sortOrder === 'publishedAt') {
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    }
    // Customize the sorting logic based on the selected sort order

    // Default: no sorting
    return 0;
  });

  return (
    <div className='px-10 py-10'>
      <h1 className="mb-6 text-3xl font-bold text-center mt-12">Nyheder - "Everything"</h1>

      { isLoading && <Loader/> }
      { error && <Error /> }

      <form onSubmit={ e => handleSearch(e) }>

        <input type="search" onChange={(e) => setSearchKey( e.target.value )} 
        placeholder='Søg noget' className='input input-bordered'/>
      
      </form>

      <div className='mt-4 mb-6'>
        <select onChange={ e => setLanguage( e.target.value ) }>
          <option value="ar">Choose Language</option>
          {
            newsParam && newsParam.language.map( c => 
            
            <option key={c.code} value={c.code}> {c.language}</option> 
            
            )
          }
        </select>
        <select onChange={handleSortChange} value={sortOrder} className='ml-8 py-6 px-2'>
          <option value="publishedAt">Sort by Published At</option>
          <option value="relevancy">Sort by Relevancy</option>
          <option value="popularity">Sort by Popularity</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
        {
          data && data.articles.map( n => 
            <div className='card w-96 bg-base-100 shadow-xl' key={n.url}>
              <figure>
                <img src={n.urlToImage} alt="" className='object-cover w-full h-60'/>
              </figure>
              <div className='card-body'>
                <div className='card-title'>
                  <h2 className='text-xl'>{n.title}</h2>
                </div>
                <span className='text-sm'>Author: <i>{n.author}</i></span>

                {/* time dateTime={n.publishedAt} */}
                
                <p className='text-gray-500 italic text-xs'>{new Date( n.publishedAt ).toLocaleString("da-DK", { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" })}</p>

                <p className='text-xs pb-3'>{formatDistanceToNow(new Date( n.publishedAt ), {locale: da, addSuffix: true, includeSeconds: true})}</p>
                
                <h3 className='text-xs font-semibold'>{truncateText(n.description, 100)}</h3>
            
                <p>{truncateText(n.content, 150)}</p>
                
                <div className='card-actions justify-end'>
                  <button className='btn bg-green-500'>
                    <a href={ n.url } target='blank' rel='noopener noreferrer' className='h-fit'>Læs mere ...</a>
                  </button>
                </div>
              </div>
            </div> 
          )
        }
      </div>

    </div>
  )
}

export default Nyheder;
