'use client';

import Image from 'next/image';
import React, { CSSProperties } from 'react'
import styles from './styles.module.css';
import { IoLocationOutline } from 'react-icons/io5';
import Rate from 'rc-rate';
import Carousel from '@/components/Carousel/Carousel';
import Link from 'next/link';
import Button from '@/components/Button/Button';
import { generateDashLinkForUser } from '@/helpers/helpers';
import { useUserContext } from '@/contexts/UserContext';
import useMobile from '@/hooks/useMobile';
import { useRouter } from 'next/navigation';
import { userTypes } from '@/features/Auth/components/UserTypeSelect/utils';
import { useSearchFilterContext } from '@/contexts/SearchFIlterContext';
import { useAppContext } from '@/contexts/AppContext';

const maxLengthForGridView = 32;
const maxGridTitleLength = 16;
const viewDurations = [1000, 1500, 1800];

const PlaceListCard = ({
  place,
  isListView=true,
  imageHeight,
  style,
  index,
}: {
  place: IPlace;
  isListView?: boolean;
  imageHeight?: number;
  style?: CSSProperties;
  index: number;
}) => {
  const placeLocation = place?.place_locations?.length > 0 ? 
    `${place?.place_locations[0]?.address}, ${place?.place_locations[0]?.city}, ${place?.place_locations[0]?.state}`
  :
  ``;
  const placeName = `${place.name}`;

  const { userDetails } = useUserContext();
  const {
    setSelectedPlaceId
  } = useAppContext();
  
  const router = useRouter();
  const isMobile = useMobile();
  
  const handleJoinClassBtnClick = () => {
    if (!userDetails) return router.push(`/auth/register?type=${userTypes.user}&next=${encodeURIComponent(`/places/${place.id}`)}`);

    setSelectedPlaceId(place.id);
  }

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
      `}
      style={style}
      // href={`/places/${place.id}`}
    >
      <Carousel
        delay={Number(index + 1) * viewDurations[Math.floor(Math.random() * viewDurations.length)]}
        style={{ 
          width: isListView && !isMobile ? 
            420 
            : 
          '100%',
          borderRadius: '12px',
        }}
      >
        {
          React.Children.toArray(place.images_data.map(imageItem => {
            return <Image
              width={0}
              height={
                isListView && !isMobile ?
                  280
                :
                imageHeight ??
                250
              }
              alt={place.description}
              src={imageItem.image as string}
              key={imageItem.id}
              className={styles.image}
            />
          }))
        }
      </Carousel>
      
      <section className={styles.details}>
        <section className={styles.top__Row}>
          <section className={styles.header__Wrap}>
            <section className={styles.title}>
              <Link 
                className={`${styles.header} ${styles.place__Name}`}
                href={`/places/${place.id}`}
              >
                {
                  isListView && !isMobile ?
                    placeName
                  :
                  placeName.length > maxGridTitleLength ?
                    placeName.slice(0, maxGridTitleLength) + '...'
                  :
                  placeName
                }
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
                      background: '#000',
                      color: '#fff'
                    }}
                    useLink
                    linkLocation={`${generateDashLinkForUser(true)}/places/add-place?id=${place.id}`}
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
                {
                  placeLocation.length > maxLengthForGridView && 
                  !isListView ?
                    placeLocation.slice(0, maxLengthForGridView) + '...'
                  :
                  placeLocation
                }
              </span>      
            </p>
          </section>
        </section>

        <ul className={styles.benefits}>
          {
            React.Children.toArray(
              place.benefits.split(',')
              .slice(
                0, 
                !isListView ? 
                  3 : 
                4
              )
              .map(benefit => {
                return <li 
                  className={styles.benefit__Item}
                  key={benefit}
                >
                  {benefit}
                </li>
            }))
          }
        </ul>

        <br />

        <section className={styles.actions__Wrap}>
          <h3 className={`${styles.header} ${styles.price}`}>
            <span className={styles.price__Intro}>Review</span>
            {' '}
            <span className={styles.price__Intro}>from</span>
            {' '}
            <span>${place.pricing}/month</span>
          </h3>

          {
            userDetails?.id !== place.owner ?
              <Button 
                label='join class'
                style={{
                  background: 'transparent',
                  color: '#000',
                  border: '1px solid #000',
                  fontSize: '0.8rem'
                }}
                hoverStyle={{
                  background: '#000',
                  color: '#fff'
                }}
                handleClick={handleJoinClassBtnClick}
              />
            :
            <></>
          }
        </section>
      </section>
    </section>
  )
}

export default PlaceListCard