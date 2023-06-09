import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import locationPin from './locationPin.png';

const MapForUser = ({ setMarkerPosition, setShowMap, markerPosition,allPL,setPlData }) => {
  // const [markerPosition, setMarkerPosition] = useState([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDeosvjuXnbDOLK0qsW-vBgqUoHIcRCkhY',
  });

  const handleMapClick = (event) => {
    const { latLng } = event;
    setMarkerPosition({
      lat: latLng.lat(),
      lng: latLng.lng(),
    });
    console.log(markerPosition.lat)
    console.log(markerPosition.lng)
  };
  const [selectedMarker, setSelectedMarker] = useState(null);
  const handleClick =(e)=>{
    setPlData(e);
  }

  return isLoaded ? (
    <div className='flex flex-col w-[100%] justify-center text-white gap-3 mt-10'>
      <h1 className='text-gradient text-2xl sm:text-2xl mb-5' style={{textAlign:'center'}}>Please select the parking facility nearest to your location that provides the most cost-effective options.</h1>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{lat: 34.12426, lng: 74.838986}}
        zoom={16}
        onClick={handleMapClick}
      >
        {markerPosition && <Marker  icon={{url:locationPin,scaledSize: new window.google.maps.Size(24, 35),}} position={markerPosition} title='Hello World!' />}
        {allPL && allPL.map(element => {
          return(
            <Marker key={element._id} id={element._id} position={{ lat: element.Lattitude, lng: element.Longitude }} onClick={()=>handleClick(element)} />
          )
        })}
      </GoogleMap>
    </div>
  ) : (
    <div>Loading Map...</div>
  );
};

export default MapForUser;
