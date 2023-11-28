import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ latitude, longitude, zoom, locationName }) => {
    if (isNaN(latitude) || isNaN(longitude)) {
        return <div>Error: Invalid coordinates</div>;
    }

    const position = [latitude, longitude];
    console.log('Location', position);
    return (
        <MapContainer center={position} zoom={zoom} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                language="en"
            />
            {Array.isArray(position) && position.length === 2 && (
                <Marker position={position}>
                    <Popup>{`Location: ${locationName || 'Your location'}`}</Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default MapComponent;
