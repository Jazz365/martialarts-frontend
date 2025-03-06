import React from 'react'
import styles from './styles.module.css'


const CircularLoader = ({
    size='48px',
    thickness='5px',
}: {
    size?: string;
    thickness?: string;
}) => {
    return (
        <span
            className={styles.loader}
            style={
                {
                    width: size,
                    height: size,
                    "--border-width": thickness,
                } as React.CSSProperties
            }
        ></span>
    )
}

export default CircularLoader