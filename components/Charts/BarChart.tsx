'use client';

import React from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import styles from './styles.module.css'
import useMobile from '@/hooks/useMobile';
import PageLoader from '../loaders/PageLoader/PageLoader';


const CustomBarChart = ({
    title='',
    subtitle='',
    data=[],
    dataKeyName='',
    labelKeyName='',
    isLoading=false,
    hasDataSelect=false,
    dataSelectOptions=[],
    dataSelectValue,
    handleUpdateDataSelectValue=()=>{},
    height=500,
}: {
    title: string;
    subtitle: string;
    data: {}[];
    dataKeyName: string;
    labelKeyName: string;
    isLoading?: boolean;
    hasDataSelect?: boolean;
    dataSelectOptions?: {id: string; label: string; value: string}[];
    dataSelectValue?: string;
    handleUpdateDataSelectValue?: (val: string) => void;
    height?: number;
}) => {
    const isMobile = useMobile();

    return <section className={styles.content}>
        <section className={styles.title__Wrap}>
            <h3 className={styles.title}>
                <>{title}</>
                <span className={styles.subtitle}>{subtitle}</span>
            </h3>

            {
                hasDataSelect === true && dataSelectOptions.length > 0 &&
                <select
                    className={styles.data__Select}
                    value={dataSelectValue}
                    onChange={({ target }) => handleUpdateDataSelectValue(target.value)}
                    disabled={isLoading}
                >
                    {
                        React.Children.toArray(dataSelectOptions.map(optionItem => {
                            return <option 
                                key={optionItem.id}
                                value={optionItem.value}
                            >
                                {optionItem.label}
                            </option>
                        }))
                    }
                </select>
            }
        </section>

        {
            isLoading ?
                <PageLoader />
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
                <BarChart
                    width={500}
                    height={400}
                    data={data}
                    margin={
                        isMobile ?
                            {}
                        :
                        {
                            top: 20,
                            right: 30,
                            left: 0,
                            bottom: 80,
                        }
                    }
                    barSize={50}
                >   
                    <XAxis 
                        dataKey={labelKeyName} 
                        tick={{
                            fontSize: 12,
                            textAnchor: 'top'
                        }}
                        angle={45}
                    />

                    <YAxis
                        tick={{
                            fontSize: 12
                        }}
                    />
                    
                    <Tooltip />

                    <Bar
                        dataKey={dataKeyName}
                        fill="var(--primary-app-color)" 
                    />
                </BarChart>
            </ResponsiveContainer>
        }
    </section>
}

export default CustomBarChart