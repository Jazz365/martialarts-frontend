'use client';


import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logo from '../../assets/FAVICON-plain.png'
import ProfileItem from '../ProfileItem/ProfileItem'
import Link from 'next/link'
import styles from './styles.module.css'
import { usePathname } from 'next/navigation';
import { useUserContext } from '@/contexts/UserContext';
import { LinkItemDetail, ownerNavLinks } from './utils';

const SideBar = () => {
    const currentPath = usePathname();
    const { userDetails } = useUserContext();

    const [ links, setLinks ] = useState<LinkItemDetail[]>([]);

    useEffect(() => {
        if (!userDetails) return setLinks([]);

        if (userDetails.is_owner === true) {
            setLinks(ownerNavLinks);

            return;
        }
        
    }, [userDetails])
    
    return (
        <nav className={styles.side__Nav}>
            <section className={styles.nav__Info}>
                <Link
                    href={'/'}
                >
                    <Image 
                        src={logo}
                        alt='logo'
                        width={50}
                        height={50}
                        priority
                    />
                </Link>

                <ul className={styles.links__Wrap}>
                    {
                        React.Children.toArray(links.map(link => {
                            return <li 
                                className={`${styles.link__Item} ${link.location === currentPath ? styles.active : ''}`}
                                key={link.id}
                            >
                                <Link href={link.location}>
                                    <link.icon />
                                    <span>{link.text}</span>
                                </Link>
                            </li>
                        }))
                    }
                </ul>
            </section>

            <ProfileItem />
        </nav>
    )
}

export default SideBar