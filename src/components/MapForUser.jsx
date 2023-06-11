import React, { useState,useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import locationPin from './locationPin.png';

const MapForUser = ({ setMarkerPosition, setShowMap, markerPosition, allPL, setPlData }) => {
  const [selectedMarker, setSelectedMarker] = useState(markerPosition);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDeosvjuXnbDOLK0qsW-vBgqUoHIcRCkhY',
  });

  // Function takes two objects, that contain coordinates to a starting and destination location.
  function calcDistance(startCoords) {
    console.log(startCoords);
    console.log(selectedMarker);
    let startingLat = degreesToRadians(startCoords.lat);
    let startingLong = degreesToRadians(startCoords.lng);
    let destinationLat = degreesToRadians(selectedMarker.lat);
    let destinationLong = degreesToRadians(selectedMarker.lng);

    // Radius of the Earth in kilometers
    let radius = 6571;

    // Haversine equation
    let distanceInKilometers = Math.acos(Math.sin(startingLat) * Math.sin(destinationLat) +
      Math.cos(startingLat) * Math.cos(destinationLat) *
      Math.cos(startingLong - destinationLong)) * radius;

    return distanceInKilometers;
  }

  function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI)/180;
    return radians;
  }

  useEffect(() => {
    const distance=calcDistance(markerPosition)
    console.log(distance)
  }, [selectedMarker]);

  const handleMapClick = (event) => {
    const { latLng } = event;
    const updatedValue = {lat:latLng.lat(),lng:latLng.lng()};
    setSelectedMarker(shopCart => ({
      ...shopCart,
      ...updatedValue
    }));

    
  };
  const handleClick = (e) => {
    setPlData(e);
  }


  return isLoaded ? (
    <div className='flex flex-col w-[100%] justify-center text-white gap-3 mt-10'>
      <h1 className='text-gradient text-2xl sm:text-2xl mb-5' style={{ textAlign: 'center' }}>Please select the parking facility nearest to your location that provides the most cost-effective options.</h1>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={selectedMarker}
        zoom={16}
        onClick={handleMapClick}
      >
        {markerPosition && <Marker icon={{ url: locationPin, scaledSize: new window.google.maps.Size(24, 35), }} position={markerPosition} title='Hello World!' />}

        {selectedMarker && <Marker position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }} />}
      </GoogleMap>
    </div>
  ) : (
    <div>Loading Map...</div>
  );
};

export default MapForUser;
