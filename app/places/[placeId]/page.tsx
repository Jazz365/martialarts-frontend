import SinglePlaceView from '@/features/Places/sections/SinglePlaceView/SinglePlaceView';
import NavigationBar from '@/layouts/NavigationBar/NavigationBar'
import React from 'react'

const Places = async (props: { params: PageParams }) => {
    const { placeId } = await props.params;
    
    return <>
        <NavigationBar />

        <SinglePlaceView 
            id={placeId ? Number(placeId) : null}
        />
    </>
}

export default Places