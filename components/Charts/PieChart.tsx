'use client';

import React, { useState } from 'react'
import styles from './styles.module.css'
import PageLoader from '../loaders/PageLoader/PageLoader';
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';


const COLORS = ["var(--open-day-highlight)", "var(--primary-app-color)", "var(--gold-yellow-color)"];

interface PieChartDataItem {
    name: string;
    value: number;
}

const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />

        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" fontSize={11}>{`Total: ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" fontSize={11}>
          {`${(percent * 100).toFixed(2)}%`}
        </text>
      </g>
    );
};

const CustomPieChart = ({
    title,
    subtitle,
    data=[],
    isLoading=false,
    height=500,
}: {
    title: string;
    subtitle: string;
    data: PieChartDataItem[];
    isLoading?: boolean;
    height?: number;
}) => {
    const [ activeIndex, setActiveIndex ] = useState<number>(0);

    const onPieEnter = (_: unknown, index: number) => {
        setActiveIndex(index);
    }

    return (
        <section className={styles.content}>
            <h3 className={styles.title}>
                <>{title}</>
                <span className={styles.subtitle}>{subtitle}</span>
            </h3>

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
                    <PieChart>
                        <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            dataKey="value"
                            onMouseEnter={onPieEnter}
                        >
                            {data.map((_entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            }
        </section>
    )
}

export default CustomPieChart