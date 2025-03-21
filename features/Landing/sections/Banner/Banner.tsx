import React from 'react'
import styles from './styles.module.css'
import { IoIosArrowRoundForward } from 'react-icons/io'
// import happyIllustration from '../../../../assets/happy.svg'
import astronaut from '../../../../assets/astr.webp'
import FadeInOnScroll from '@/components/wrapperComponents/FadeInOnScroll/FadeInOnScroll'
import Button from '@/components/buttons/Button/Button'
import { publicUserTypes } from '@/features/Auth/components/UserTypeSelect/utils'
import MemoizedImage from '@/components/common/MemoizedImage/MemoizedImage'

const Banner = () => {
    return <>
        <FadeInOnScroll>
            <section className={styles.content__Wrap}>
                <section className={styles.banner}>
                    <section className={styles.banner__Text}>
                        <section className={styles.banner__Header}>
                            <h2 className={styles.header}>Spotlight your classes & studio</h2>

                            <p className={styles.info}>easy to add, simple to manage</p>
                        </section>

                        <Button 
                            label='get started'
                            icon={
                                <IoIosArrowRoundForward size={'1.5rem'} />
                            }
                            isLeadingIcon={false}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: 'max-content',
                                padding: '0.875rem 1.5rem',
                                borderRadius: '24px',
                                backgroundColor: '#fff',
                                color: '#000',
                                cursor: 'pointer',
                                gap: '1rem',
                                transition: '0.25s ease-in-out',
                            }}
                            hoverStyle={{
                                backgroundColor: '#000',
                                color: '#fff'
                            }}
                            useLink={true}
                            linkLocation={`/auth/register?type=${publicUserTypes.owner}`}
                        />
                    </section>

                    <MemoizedImage 
                        alt={'banner illustration'}
                        src={astronaut}
                        className={styles.banner__Img}
                        // priority
                    />
                </section>
            </section>
        </FadeInOnScroll>
    </>
}

export default Banner