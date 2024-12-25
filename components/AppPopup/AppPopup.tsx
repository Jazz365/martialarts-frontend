import React from 'react'
import styles from './styles.module.css'
import { IoClose } from 'react-icons/io5'
import astronaut from '../../assets/astr.png'
import Image from 'next/image'


const AppPopup = ({
    content="We're constantly improving and adding new Studios.\nStay tuned for more exciting updates!",
    hidePopup=()=>{},
}: {
    content?: string;
    hidePopup?: () => void;
}) => {
    return <section className={styles.overlay}>
        <section className={styles.popup}>
            <IoClose 
                cursor={'pointer'} 
                onClick={hidePopup}
                size={'1.4rem'}
                style={{
                    marginLeft: 'auto',
                }}
            />

            <Image
                src={astronaut}
                alt='happy'
                width={0}
                height={150}
                className={styles.illus}
                priority
            />
            
            <section className={styles.info}>
                <h2 className={styles.header}>Thanks For Visiting Martialarts.guru!</h2>
                <p>{content}</p>
            </section>
        </section>
    </section>
}

export default AppPopup