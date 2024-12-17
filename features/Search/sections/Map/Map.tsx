'use client';

import React, { useRef, useState } from 'react'
import styles from './styles.module.css'
import GoogleMap, { Map, MapMouseEvent } from 'google-maps-react-markers'


const PlacesMap = ({
  placeCoordinates=[]
}: {
  placeCoordinates?: {
    lat: number;
    lng: number;
    name: string;
  }[]
}) => {
  const mapRef = useRef<Map | null>(null)
  const [mapReady, setMapReady] = useState(false)

  const onGoogleApiLoaded = ({ map, maps }: { map: Map, maps: Map[]}) => {
    mapRef.current = map
    setMapReady(true)
  }

  const onMarkerClick = (e: MapMouseEvent, { markerId, lat, lng }: { 
    markerId: string; 
    lat: number; lng: 
    number 
  }) => {
    if (!mapRef.current) return;

    console.log('This is ->', markerId)

    mapRef.current.setCenter({ lat, lng })
  }

  return <>
    <section className={styles.content__Wrap}>
      <GoogleMap
        apiKey={process.env.NEXT_PUBLIC_MAP_KEY}
        // apiKey={''}
        defaultCenter={{ lat: 45.4046987, lng: 12.2472504 }}
        defaultZoom={5}
        // options={mapOptions}
        mapMinHeight="100vh"
        onGoogleApiLoaded={onGoogleApiLoaded}
        // onChange={(map) => console.log('Map moved', map)}
      >
        {/* {placeCoordinates.map(({ lat, lng, name }, index) => (
          <Marker
            key={index}
            lat={lat}
            lng={lng}
            markerId={name}
            onClick={onMarkerClick} // you need to manage this prop on your Marker component!
          />
        ))} */}
      </GoogleMap>
    </section>
  </>
}

export default PlacesMap