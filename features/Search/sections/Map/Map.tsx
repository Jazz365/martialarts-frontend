'use client';

import React, { useState } from 'react'
import styles from './styles.module.css'
import { useAppContext } from '@/contexts/AppContext';
import { APIProvider, InfoWindow, Map, Marker} from "@vis.gl/react-google-maps";
import { defaultMapCenter, testMapCoordinates } from './utils';

interface PlaceCoordinate {
  lat: number;
  lng: number;
  name: string;
}

const PlacesMap = ({
  placeCoordinates=[],
  minHeight="100dvh",
  width,
  showContentOnSmallScreen=false,
  zoom=11,
}: {
  placeCoordinates?: PlaceCoordinate[];
  minHeight?: string;
  width?: string;
  showContentOnSmallScreen?: boolean;
  zoom?: number;
}) => {
  const { showMap } = useAppContext();
  const [ selectedLocation, setSelectedLocation ] = useState<PlaceCoordinate | null>(null);
  const [ showDialog, setShowDialog ] = useState(false)

  const handleMarkerClick = (e: google.maps.MapMouseEvent, clickedCoord: PlaceCoordinate) => {
    setSelectedLocation(clickedCoord);
    setShowDialog(true);
  }

  return <>
    <section 
      className={`${styles.content__Wrap} ${showMap === false ? styles.hide : ''} ${showContentOnSmallScreen === true ? styles.main : ''}`}
      style={{
        width,
      }}
    >
      <APIProvider
        apiKey=''
        // apiKey={process.env.NEXT_PUBLIC_MAP_KEY}
      >
        <Map
          defaultZoom={zoom}
          defaultCenter={
            placeCoordinates.length > 0 ? 
              placeCoordinates[0] 
            : 
            defaultMapCenter
          }
          disableDefaultUI
          style={{ 
            minHeight, 
            height: minHeight 
          }}
        >
          {showDialog && (
            <InfoWindow position={selectedLocation}>
              <h1>{selectedLocation?.name}</h1>
            </InfoWindow>
          )}

          {
            placeCoordinates.map((coord, index) => {
              return <Marker 
                position={coord} 
                key={`${index}`}
                onClick={(e) => handleMarkerClick(e, coord)}
              />
            })
          }
        </Map>
      </APIProvider>
    </section>
  </>
}

export default PlacesMap