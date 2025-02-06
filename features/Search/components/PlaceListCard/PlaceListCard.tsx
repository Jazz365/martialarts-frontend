'use client';

import React, { CSSProperties, memo } from 'react'
import styles from './styles.module.css';
import useMobile from '@/hooks/useMobile';
import { useAppContext } from '@/contexts/AppContext/AppContext';
import PlaceCardTitle from './components/PlaceCardTitle';
import PlaceCardStyleOfferings from './components/PlaceCardStyleOfferings';
import PlaceCardBenefits from './components/PlaceCardBenefits';
import PlaceCardActions from './components/PlaceCardActions';
import PlaceCardCarousel from './components/PlaceCardCarousel/PlaceCardCarousel';

const PlaceListCard = memo(({
  place,
  isListView=true,
  imageHeight,
  style={},
  index,
  isInAppStudioUse=false,
  useFullView=false,
}: {
  place: IPlace;
  isListView?: boolean;
  imageHeight?: number;
  style?: CSSProperties;
  index: number;
  isInAppStudioUse?: boolean;
  useFullView?: boolean;
}) => {
  const {
    showMap,
  } = useAppContext();
  
  // const router = useRouter();
  const isMobile = useMobile();
  
  // const handleJoinClassBtnClick = () => {
  //   if (!userDetails) return router.push(`/auth/register?type=${userTypes.user}&next=${encodeURIComponent(`/places/${place.id}`)}`);

  //   setSelectedPlaceId(place.id);
  // }

  return (
    <section 
      className={`
        ${styles.list__Card} 
        ${
          isListView && !isMobile ?
            styles.row
          :
          styles.col
        }
        ${
          showMap === false || useFullView === true ?
            styles.full
          :
          ''
        }
        ${
          isInAppStudioUse === true ?
            styles.studio
          :
          ''
        }
      `}
      style={style}
      // href={`/places/${place.id}`}
    >
      <PlaceCardCarousel 
        images={place.images_data ? place.images_data.slice(0, 3) : []}
        placeName={place.name}
        isListView={isListView}
        isMobile={isMobile}
        showMap={showMap}
      />
      
      <section 
        className={styles.details}
        style={{
          maxWidth: isListView && !isMobile ? 
            'calc(100% - 300px)'
          :
          '100%'
        }}
      >
        <PlaceCardTitle 
          place={place}
          isListView={isListView}
        />
        
        <PlaceCardStyleOfferings 
          place={place}
          isListView={isListView}
        />

        <PlaceCardBenefits 
          place={place}
          isListView={isListView}
        />
        
        <PlaceCardActions 
          place={place}
          isListView={isListView}
        />
      </section>
    </section>
  )
})

export default PlaceListCard