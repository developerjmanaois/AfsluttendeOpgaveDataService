import React from 'react'

const PrevNext = ( { setCurrentPage, currentPage, dataLength, itemsPerPage } ) => {
  return (
    
    <>
        
        <button className="btn mx-2 my-2" onClick={ () => setCurrentPage( currentPage - 1 ) } disabled={ currentPage <= 0 }>Prev</button>
        <button className="btn my-2" onClick={ () => setCurrentPage( currentPage + 1 ) } disabled={ currentPage + 1 >= Math.ceil( dataLength / itemsPerPage ) }>Next</button>

    </>
  )
}

export default PrevNext
