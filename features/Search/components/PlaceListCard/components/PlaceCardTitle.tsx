import React from 'react'
import styles from '../styles.module.css'
import Link from 'next/link'
import { generateDashLinkForUser } from '@/helpers/helpers';
import { IoLocationOutline } from 'react-icons/io5';
import { useUserContext } from '@/contexts/UserContext';
import Button from '@/components/buttons/Button/Button';
import useMobile from '@/hooks/useMobile';


const PlaceCardTitle = ({
    place,
    isListView,
}: {
    place: IPlace;
    isListView: boolean;
}) => {
    const {
        userDetails,
    } = useUserContext();

    const isMobile = useMobile();

    const [
        placeLocation,
        placeName,
    ] = [
        place?.place_locations?.length > 0 ? 
        `${place?.place_locations[0]?.address}, ${place?.place_locations[0]?.city}, ${place?.place_locations[0]?.state}`
        :
        ``,
        `${place.name}`,
    ];

    return <>
        <section className={styles.top__Row}>
          <section className={styles.header__Wrap}>
            <section className={styles.title}>
              <Link
                className={`${styles.header} ${styles.place__Name}`}
                href={`/places/${place.id}`}
              >
                {placeName}
              </Link>
              
              {
                userDetails?.id === place.owner ?
                  <Button
                    label='edit'
                    style={{
                      padding: '0.45rem 1.2rem',
                      border: '1px solid #000',
                      background: 'transparent',
                      color: '#000',
                      fontSize: '0.75rem'
                    }}
                    hoverStyle={{
                      background: 'var(--primary-app-color)',
                      borderColor: 'transparent',
                      color: '#fff'
                    }}
                    useLink
                    linkLocation={`${generateDashLinkForUser(true)}/studios/add-studio?id=${place.id}`}
                  />
                :
                <></>
              }
            </section>

            {/* <div className={styles.detail__Item}>
              <Rate
                allowHalf={true}
                value={place.average_rating}
                disabled={true}
                style={{
                  fontSize: '1.5rem',
                }}
              />
              <span>{Number(place.average_rating).toFixed(1)}</span>
              
              <span></span>
              <span></span>
              <span></span>

              <span className={styles.grey__Content}>{place?.reviews?.length ?? 0} review{place?.reviews?.length > 1 ? 's' : ''}</span>
            </div> */}

            <p className={styles.detail__Item}>
              <IoLocationOutline size={'1.2rem'} />
              <span className={styles.location}>
                {placeLocation}
              </span>      
            </p>
          </section>
        </section>
    </>
}

export default PlaceCardTitle