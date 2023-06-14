import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const MapContainer = ({ google }) => {
  const [currentLocation, setCurrentLocation] = useState(null);

  const handleMapClick = (_, map, event) => {
    const { latLng } = event;
    const latitude = latLng.lat();
    const longitude = latLng.lng();
    setCurrentLocation({ lat: latitude, lng: longitude });
  };

  useEffect(() => {
    // Get user's current location
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  return (
    <div>
      <h2>Current Location:</h2>
      {currentLocation && (
        <div>
          <p>Latitude: {currentLocation.lat}</p>
          <p>Longitude: {currentLocation.lng}</p>
        </div>
      )}
      <Map
        google={google}
        zoom={14}
        initialCenter={{ lat: 0, lng: 0 }}
        center={currentLocation}
        onClick={handleMapClick} // Add onClick event handler
      >
        {currentLocation && (
          <Marker position={currentLocation} title="You are here" />
        )}
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAPflO-x78chKJ0IDdoMObDYf8jgKZIosU"
})(MapContainer);