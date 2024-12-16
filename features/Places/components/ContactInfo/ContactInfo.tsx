import React from 'react'
import styles from './styles.module.css'
import { IoLinkOutline, IoMailOutline } from 'react-icons/io5';
import { HiOutlinePhone } from 'react-icons/hi2';


const ContactInfo = ({
    email,
    website,
    phoneNumber,
}: {
    email: string;
    website?: string;
    phoneNumber?: string;
}) => {
    return (
        <section className={styles.content__Wrap}>
            <h3 className={styles.header}>contact information</h3>

            <section className={styles.info}>
                <p>
                    <IoMailOutline size={'1.4rem'} />
                    <span>{email}</span>
                </p>

                {
                    website &&
                    <p>
                        <IoLinkOutline size={'1.4rem'} />
                        <span>{website}</span>
                    </p>
                }

                {
                    phoneNumber &&
                    <p>
                        <HiOutlinePhone size={'1.4rem'} />
                        <span>{phoneNumber}</span>
                    </p>
                }
            </section>
        </section>
    )
}

export default ContactInfo