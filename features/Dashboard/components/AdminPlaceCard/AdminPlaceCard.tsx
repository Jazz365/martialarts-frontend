import React, { memo } from 'react'
import styles from './styles.module.css'
import AdminPlaceCardHeader from './components/AdminPlaceCardHeader';
import AdminPlaceCardDetails from './components/AdminPlaceCardDetails';


const AdminPlaceCard = memo(({
    place
}: {
    place: IPlace;
}) => {
    return (
        <section className={styles.admin__Place__Card}>
            <AdminPlaceCardHeader 
                placeId={place.id}
                name={place.name}
                status={place.status}
                images={place.images_data}
                locations={place.place_locations}
                isFeatured={place.is_featured}
            />

            <AdminPlaceCardDetails 
                place={place}
            />
        </section>
    )
})

export default AdminPlaceCard