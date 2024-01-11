import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const useRequestData = () => {

    const [ isLoading, setisLoading ] = useState( false );
    const [ data, setData ] = useState( null );
    const [ error, setError ] = useState( null );

    const makeRequest = async ( apiurl, method = "GET", bodydata = null, headers = null, params = null ) => {

        setisLoading( true )

            try {

                let response

                switch ( method ) {

                    case "GET":
                        response = await axios.get( apiurl, { headers: headers, params: params } )
                        break;
                    
                    case "POST":
                        response = await axios.post( apiurl, bodydata )
                        break;
                    
                    case "PUT":
                        response = await axios.put( apiurl, bodydata )
                        break;

                    case "PATCH":
                        response = await axios.patch( apiurl, bodydata )
                        break;

                    case "DELETE":
                        response = await axios.delete( apiurl, bodydata )
                        break;

                        default:
                        throw new Error ( "Invalid method- GET, POST, PATCH, DELETE was expected" )
                }

                if ( response.data ) {

                    setData( response.data )
                    setError( null )

                } else {

                    throw new Error( "Empty response/no data" )

                }

            } catch ( error ) {

                console.log( error )
                setError( "Der er opstået en fejl: " + error.message )
                setData( null )

            } finally {

                setisLoading( false )

            }

    }
    

    return { data, isLoading, error, makeRequest }

}
export default useRequestData;