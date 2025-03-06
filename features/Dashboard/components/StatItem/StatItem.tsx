import React from 'react'
import styles from './styles.module.css'
import { v4 as uuidv4 } from 'uuid';
import CircularLoader from '@/components/loaders/CircularLoader/CircularLoader';

const StatItem = ({
    title='stat',
    count=0,
    useDecimal=false,
    loading=false,
    extraInfo=[],
}: {
    title: string;
    count: number;
    useDecimal?: boolean;
    loading?: boolean;
    extraInfo?: string[];
}) => {
    return (
        <div className={styles.stat__Item}>
            <div className={styles.top__Row}>
                <p className={styles.title}>{title}</p>
                
                {
                    loading &&
                    <CircularLoader size='1rem' thickness='3px' />
                }
            </div>
            
            <h2 className={styles.stat}>
                {
                    useDecimal === true ?
                        Number(Number(count).toLocaleString()).toFixed(1)
                    :
                    Number(count).toLocaleString()
                }
            </h2>

            {
                extraInfo && extraInfo.length > 0 &&
                <div className={styles.extras}>
                    {
                        React.Children.toArray(extraInfo.map(info => {
                            return <p
                                key={uuidv4()}
                                className={styles.extra}
                            >
                                {info}
                            </p>
                        }))
                    }
                </div>
            }
        </div>
    )
}

export default StatItem