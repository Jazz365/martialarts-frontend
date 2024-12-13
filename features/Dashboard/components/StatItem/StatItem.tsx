import React from 'react'
import styles from './styles.module.css'


const StatItem = ({
    title='stat',
    count=0,
}: {
    title: string;
    count: number;
}) => {
    return (
        <div className={styles.stat__Item}>
            <p className={styles.title}>{title}</p>
            
            <h2 className={styles.stat}>
                {Number(count).toLocaleString()}
            </h2>
        </div>
    )
}

export default StatItem