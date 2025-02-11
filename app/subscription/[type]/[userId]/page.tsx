import React from 'react';
import SubscriptionCallbackDetails from './details';


const SubscriptionCallbackPage = async (props: { params: PageParams }) => {
    const { type, userId } = await props.params;

    return <SubscriptionCallbackDetails 
        type={type}
        userId={userId}
    />
}

export default SubscriptionCallbackPage;