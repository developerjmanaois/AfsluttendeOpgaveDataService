import React, { useEffect } from 'react';
import "./loader.css";

const Loader = () => {

  useEffect( () => {

    document.querySelector("dialog").showModal()
  
  }, [] )

  return (
    <dialog className="loading loading-bars loading-lg"></dialog>
  )
}

export default Loader