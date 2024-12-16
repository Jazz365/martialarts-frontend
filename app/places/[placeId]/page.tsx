import Footer from '@/components/Footer/Footer';
import SinglePlaceView from '@/features/Places/sections/SinglePlaceView/SinglePlaceView';
import NavigationBar from '@/layouts/NavigationBar/NavigationBar'
import { PlaceService } from '@/services/placeService';
import React from 'react'

export async function generateMetadata({
    params,
}: {
    params: {
        [key: string]: string,
    };
}) {
    const { placeId } = await params;
    if (!placeId) return {
        title: "Invalid Place",
    };

    const placeService = new PlaceService();

    try {
        const res = await placeService.getSinglePlace(Number(placeId));
        return {
            title: `${res?.name} | Places`,
        }
    } catch (error) {
        return {
            title: "Invalid Place",
        };
    }
}

const Places = async (props: { params: PageParams }) => {
    const { placeId } = await props.params;
    
    return <>
        <NavigationBar 
            showSearchBar
            wrapperStyle={{
              padding: '1rem 1.5rem'
            }}
        />

        <SinglePlaceView 
            id={placeId ? Number(placeId) : null}
        />

        <Footer />
    </>
}

export default Places