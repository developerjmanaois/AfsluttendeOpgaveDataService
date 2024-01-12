import React, { useState, useEffect } from "react";
import useRequestData from "../../hooks/useRequestData";
import { useParams } from "react-router-dom";
import Error from "../../components/Error";
import Loader from "../../components/Loader";

const ViborgHaveservice2 = () => {


    const { data, isLoading, error, makeRequest } = useRequestData();

    const { data: dataPUT, isLoading: isLoadingPUT, error: errorPUT, makeRequest: makeRequestPUT } = useRequestData();

    const [ title, setTitle ] = useState( "" )
    const [ content, setContent ] = useState( "" )

    useEffect( () => {

        makeRequest( "http://localhost:5023/aboutus" )

    }, [] )

    useEffect( () => {

        if(data && data.about) {
            
            setContent(data.about.content)
        }

    }, [data] )

    const handleSubmit = e => {

        e.preventDefault();

        const rettetAboutUs = { content: content }

        makeRequestPUT( "http://localhost:5023/aboutus/admin", "PUT", rettetAboutUs )

    }

    return (

        <div>

            <h1 className="mb-6 text-3xl font-bold text-center">About Us - Edit/update Posts</h1>

            { (error || errorPUT) && <Error /> }
            { (isLoading || isLoadingPUT) && <Loader /> }

            {
                dataPUT &&
                    <div className="card max-w-screen-md mx-auto">
                        <div className="card-body">
                            <h2>Todo er rettet!</h2>
                            <p>Title: {dataPUT.about.title}</p>
                            <p>Content: { dataPUT.about.content }</p>
                        </div>
                    </div>
            }

            <form className='form-control max-w-screen-md mx-auto' onSubmit={ handleSubmit }>

                <label htmlFor='inpTitle'>Title</label>
                <input 
                    id='inpTitle'
                    type="text" 
                    onInput={ e => setTitle( e.target.value )}
                    value={ title }
                    required
                    placeholder="Title" 
                    className="input input-bordered w-full" />
                    
                    
                <label htmlFor='txtContent' className="mt-4">Content</label>
                <textarea 
                    id='txtContent'
                    onInput={ e => setContent( e.target.value ) }
                    value={ content }
                    required
                    placeholder="Content" 
                    className="textarea textarea-bordered w-full" />
                
                {/* <label htmlFor='chkDone' className="mt-4">Udført</label>
                <input type="checkbox" name="done" value="true" id="chkDone" defaultChecked={ done } onChange={ e => e.checked ? setDone( true ) : setDone( false )} /> */}
                

                <button type='submit' className='my-10 btn bg-green-500'>Opret ny post</button>

            </form>

        </div>

    )

}
export default ViborgHaveservice2;