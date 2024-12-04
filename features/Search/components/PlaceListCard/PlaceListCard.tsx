import Image from 'next/image';
import React from 'react'
import styles from './styles.module.css';
import { IoLocationOutline } from 'react-icons/io5';
import Rate from 'rc-rate';
import Carousel from '@/components/Carousel/Carousel';
import Link from 'next/link';
import { useSearchFilterContext } from '@/contexts/SearchFIlterContext';
import { listingViewTypes } from '../../sections/Places/utils';

const maxLengthForGridView = 32;

const PlaceListCard = ({
  place,
}: {
  place: IPlace;
}) => {
  const {
    activeFilters
  } = useSearchFilterContext();

  const placeLocation = `${place?.locations[0]?.address}, ${place?.locations[0]?.city}, ${place?.locations[0]?.state}`;

  return (
    <Link 
      className={`
        ${styles.list__Card} 
        ${
          (
            activeFilters.view.length < 1 ||
            activeFilters.view === listingViewTypes.listView
          ) ?
            styles.row
          :
          styles.col
        }
      `}
      href={`/places?placeId=${place.id}`}
    >
      <Carousel>
        {
          React.Children.toArray(place.images.map(imageItem => {
            return <Image
              width={200}
              height={
                (
                  activeFilters.view.length < 1 ||
                  activeFilters.view === listingViewTypes.listView
                ) ?
                  280
                :
                200
              }
              alt={place.description}
              src={imageItem.image}
              key={imageItem.id}
              className={styles.image}
            />
          }))
        }
      </Carousel>
      
      <section className={styles.details}>
        <section className={styles.header__Wrap}>
          <h2 className={styles.header}>{place.name}</h2>
          <div className={styles.detail__Item}>
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
          </div>

          <p className={styles.detail__Item}>
            <IoLocationOutline size={'1.2rem'} />
            <span>
              {
                placeLocation.length > maxLengthForGridView && 
                activeFilters.view === listingViewTypes.gridView ?
                  placeLocation.slice(0, maxLengthForGridView) + '...'
                :
                placeLocation
              }
            </span>      
          </p>
        </section>

        <ul className={styles.benefits}>
          {
            React.Children.toArray(place.benefits
              .slice(
                0, 
                activeFilters.view === listingViewTypes.gridView ? 
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

        <h3 className={`${styles.header} ${styles.price}`}>
          <span className={styles.price__Intro}>from</span>
          {' '}
          <span>${place.price}/month</span>
        </h3>
      </section>
    </Link>
  )
}

export default PlaceListCard