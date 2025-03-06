'use client';

import React from 'react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import styles from './styles.module.css'
import useMobile from '@/hooks/useMobile';
import PageLoader from '../loaders/PageLoader/PageLoader';


const CustomLineChart = ({
    title='',
    subtitle='',
    data=[],
    dataKeyName='',
    labelKeyName='',
    isLoading=false,
    height=500,
    fontSize=12,
    margin={
        top: 10,
        right: 60,
        left: 0,
        bottom: 50,
    },
}: {
    title: string;
    subtitle: string;
    data: {}[];
    dataKeyName: string;
    labelKeyName: string;
    isLoading?: boolean;
    height?: number;
    fontSize?: number;
    margin?: { top: number; right: number; left: number; bottom: number };
}) => {
    const isMobile = useMobile();

    return <section className={styles.content}>
        <h3 className={styles.title}>
            <>{title}</>
            <span className={styles.subtitle}>{subtitle}</span>
        </h3>

        {
            isLoading ? <>
                <PageLoader />
            </>
            :
            <ResponsiveContainer 
                width="100%" 
                height={height}
                style={{
                    pointerEvents: data.length < 1 ? 
                        'none' 
                    : 
                    'all'
                }}
            >
                <LineChart
                    data={data}
                    margin={
                        isMobile ?
                            {}
                        :
                        margin
                    }
                >   
                    <XAxis 
                        dataKey={labelKeyName} 
                        tick={{
                            fontSize,
                            textAnchor: 'top'
                        }}
                        angle={45}
                    />

                    <YAxis
                        tick={{
                            fontSize,
                        }}
                    />
                    
                    <Tooltip />

                    <Line
                        dataKey={dataKeyName}
                        fill="var(--primary-app-color)" 
                        type={'monotone'}
                    />
                </LineChart>
            </ResponsiveContainer>
        }
    </section>
}

export default CustomLineChart