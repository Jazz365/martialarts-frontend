import { CSSProperties, useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./styles.module.css";

const ProgressBar = ({ 
    durationInMS,
    style,
}: {
    durationInMS: number;
    style?: CSSProperties;
}) => {
    const statusRef = useRef<HTMLDivElement>(null);
    const [ currentStatus, setCurrentStatus ] = useState(0);

    useEffect(() => {
        function move() {
            let width = 1;
            const intervalPerRun = durationInMS / 100; 
            const id = setInterval(frame, intervalPerRun ? intervalPerRun : 100);

            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                } else {
                    setCurrentStatus(width)
                    width++; 
                    try {
                        if (statusRef.current) statusRef.current.style.width = width + '%';                         
                    } catch (error) {
                        
                    }
                }
            }
        }

        move();
    }, [durationInMS])

    return <>
        <div className={styles.progress__Bar__Wrapper} style={style}>
            <div ref={statusRef} className={styles.progress__Bar__Container} style={{ width: `${currentStatus}%` }}>{currentStatus}%</div>
        </div>
    </>
}

export default ProgressBar;