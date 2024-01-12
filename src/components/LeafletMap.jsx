import React, { useEffect, useRef } from 'react'
import L from 'leaflet';
import 'Leaflet/dist/leaflet.css';

const LeafletMap = ( { coord = [ 56, 10 ], info = "", setLat = null, setLon = null } ) => {

    const mapRef = useRef();
    const markerRef = useRef();

    useEffect( () => {

        if( !mapRef.current ) {

            mapRef.current = L.map('mapcontainer').setView( coord, 13)

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(mapRef.current);

            markerRef.current = L.marker( coord ).addTo( mapRef.current ) //.bindPopup(info) //.openPopup()

            if ( info !== "" ) {
                markerRef.current.bindPopup( info )
            }

        } else {

            mapRef.current.setView(coord, 13)
            
            markerRef.current.setLatLng( coord ) //.bindPopup(info) //.openPopup()

            if (setLat || setLon) {

                mapRef.current.on( 'click', e => {
                    setLat ( e.latlng.lat ); 
                    setLon( e.latlng.lng )
                } )

            }
            

        }

    }, [ coord ] )

    return (
        <div id='mapcontainer' style={ { width: '620px', height: '400px' } }>
            Kortet loader...
        </div>
    )
}

export default LeafletMap
