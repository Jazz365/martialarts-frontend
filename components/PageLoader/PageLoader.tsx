import Loader from '@/components/Loader/Loader'
import React from 'react'

const PageLoader = () => {
    return <section 
        style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '1rem 0'
        }}
    >
        <Loader />
    </section>
}

export default PageLoader