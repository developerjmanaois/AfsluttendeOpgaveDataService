import React, { useState, useEffect, useRef } from "react";
import useRequestData from "../../hooks/useRequestData";
import { useParams } from "react-router-dom";
import Error from "../../components/Error";
import Loader from "../../components/Loader";

const MyTodosEdit = () => {

    const refDone = useRef()

    const { todoID } = useParams();

    const { data, isLoading, error, makeRequest } = useRequestData();
    const { data: dataPUT, isLoading: isLoadingPUT, error: errorPUT, makeRequest: makeRequestPUT } = useRequestData();

    useEffect( () => {

        makeRequest( "http://localhost:5023/aboutus/" + todoID )

    }, [todoID] )

    const handleSubmit = e => {

        e.preventDefault();

        const fd = new FormData(e.target)


        makeRequestPUT( "http://localhost:5023/aboutus/admin/" + todoID, "PUT", fd )

    }

    return (

        <div>

            <h1 className="my-6 text-3xl font-bold text-center">MyTodo - Edit/update Posts</h1>

            { (error || errorPUT ) && <Error /> }
            { (isLoading || isLoadingPUT ) && <Loader /> }

            {
                dataPUT &&
                    <div className="card">
                        <div className="card-body">
                            <h2>Todo er rettet!</h2>
                            <p>Title: { dataPUT.about.title }</p>
                            <p>Description: { dataPUT.about.description }</p>
                        </div>
                    </div>
            }

            {
                data && 

                <form className='form-control' onSubmit={ handleSubmit }>
                    
                    <label htmlFor='inpTitle'>Title</label>
                    <input 
                        id='inpTitle'
                        type="text"
                        name="title" 
                        defaultValue={ data.about.title }
                        required
                        placeholder="Title" 
                        className="input input-bordered w-full" />

                    <label htmlFor='txtContent' className="mt-4">Description</label>
                    <textarea 
                        id='txtContent'
                        name="content"
                        defaultValue={ data.about.description }
                        required
                        placeholder="Content" 
                        className="textarea textarea-bordered w-full" />

                    <button type='submit' className='mt-4 btn'>Ret Todo</button>

                </form>
            }


        </div>

    )

}
export default MyTodosEdit;