import React from 'react'
import styles from './styles.module.css'
import Image from 'next/image';


const SinglePlaceDescription = ({
    description,
    video,
    masters,
}: {
    description: string;
    video: string;
    masters: IPlaceMasterImage[];
}) => {
    return (
        <section className={styles.content__Wrap}>
            <h3 className={styles.header}>about this place</h3>

            <section className={styles.content}>
                <section className={styles.intro}>
                    <iframe
                        width="100%"
                        height="300"
                        src="https://www.youtube.com/embed/bxuYDT-BWaI"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe>

                    <section className={styles.masters__Wrap}>
                        <h4 className={styles.content__header}>your masters</h4>

                        <section className={styles.masters}>
                            {
                                React.Children.toArray(masters.map(master => {
                                    return <section className={styles.master__item}>
                                        <Image 
                                            width={100}
                                            height={100}
                                            alt={master.name}
                                            src={master.image as string}
                                            style={{
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                            }}
                                        />

                                        <p>{master.name}</p>
                                    </section>
                                }))
                            }
                        </section>
                    </section>
                </section>

                <section className={styles.description__Content}>
                    <h4 className={styles.content__header}>description</h4>

                    <p>{description}</p>
                </section>
            </section>
        </section>
    )
}

export default SinglePlaceDescription