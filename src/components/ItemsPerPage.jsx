import React from 'react';

const ItemsPerPage = ({setItemsPerPage, setCurrentPage, options}) => {
  return (
    <div>
        {
            // [ 5, 10, 20, 50, 100 ] 
            options.map(o => (
                
            <button key={"btn" + o} className="btn mx-1 my-4" onClick={ () => {setItemsPerPage(o) ; setCurrentPage(0)} }>{o} pr. side</button> ))
        }
    </div>
  )
}

export default ItemsPerPage;
