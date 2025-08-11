'use client';

import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface StaticMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  width?: string | number;
  height?: string | number;
  className?: string;
  onLocationChange?: (lat: number, lng: number) => void;
  draggable?: boolean;
}

const StaticMap: React.FC<StaticMapProps> = ({
  latitude,
  longitude,
  zoom = 13,
  width = '100%',
  height = 200,
  className,
  onLocationChange,
  draggable = true,
}) => {
  const [position, setPosition] = useState<[number, number]>([latitude, longitude]);

  useEffect(() => {
    setPosition([latitude, longitude]);
  }, [latitude, longitude]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      });
    }
  }, []);

  const handleDragEnd = (e: any) => {
    const latlng = e.target.getLatLng();
    setPosition([latlng.lat, latlng.lng]);
    if (onLocationChange) {
      onLocationChange(latlng.lat, latlng.lng);
    }
  };

  return (
    <Box
      className={className}
      sx={{
        width,
        height,
        borderRadius: 1,
        border: '1px solid #e0e0e0',
        overflow: 'hidden',
      }}
    >
      <MapContainer
        center={position}
        zoom={zoom}
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={draggable}
        dragging={draggable}
        touchZoom={draggable}
        doubleClickZoom={draggable}
        boxZoom={draggable}
        keyboard={draggable}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker
          position={position}
          draggable={draggable}
          eventHandlers={{ dragend: handleDragEnd }}
        >
          <Popup>
            Location: {position[0].toFixed(6)}, {position[1].toFixed(6)}
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default StaticMap;
