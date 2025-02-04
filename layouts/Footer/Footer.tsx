'use client';


import React, { useMemo, useState } from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import facebookIcon from '../../assets/icons/facebook.webp'
import instagramIcon from '../../assets/icons/instagram.webp'
import tiktokIcon from '../../assets/icons/tiktok.webp'
import youtubeIcon from '../../assets/icons/youtube.webp'
import { useAppContext } from '@/contexts/AppContext/AppContext';
import { AppConstants } from '@/utils/constants';
import MemoizedImage from '@/components/MemoizedImage/MemoizedImage';
import Loader from '@/components/loaders/Loader/Loader';
import AlternatingDotsLoader from '@/components/loaders/AlternatingDotsLoader/AlternatingDotsLoader';
import PdfViewer from '@/components/PdfViewer/PdfViewer';
import Button from '@/components/Button/Button';

const Footer = () => {
    const { allStyles, stylesLoading } = useAppContext();
    const [ showPdfViewer, setShowPdfViewer ] = useState(false);
    const [ pdfToShow, setPdfToShow ] = useState<string | null>(null);

    const popularStyles = useMemo(() => {
        if (!allStyles || !Array.isArray(allStyles)) return [];
        return allStyles.filter(style => style.is_popular === true);
    }, [allStyles]);

    const handleShowPDF = (pdf: string) => {
        setPdfToShow(pdf);
        setShowPdfViewer(true);
    }

    const handleClosePDFViewer = () => {
        setShowPdfViewer(false);
        setPdfToShow(null);
    }

    return <>
        <footer className={styles.footer}>
            <section className={styles.footer__Wrapper}>
                <section className={styles.logo__Wrap}>
                    <MemoizedImage 
                        src={'/logo-new.png'}
                        alt='logo'
                        width={180}
                        height={25}
                        className={styles.logo}
                    />
                    <p className={styles.logo__Subtitle}>
                        Bringing You the Best Martial Arts Studios and Classes Near You
                    </p>
                </section>

                <section className={styles.footer__Content}>
                    <section className={styles.footer__Content__Wrap}>
                        <h4 className={styles.header}>Company</h4>

                        <ul className={styles.footer__Links}>
                            <li>
                                <Link href={''}>About Us</Link>
                            </li>
                            <li>
                                <Link href={''}>Careers</Link>
                            </li>
                            <li>
                                <Link href={''}>Pricing</Link>
                            </li>
                            <li>
                                <Link href={''}>Blog</Link>
                            </li>
                        </ul>
                    </section>

                    <section className={styles.footer__Content__Wrap}>
                        <h4 className={styles.header}>Popular Styles</h4>

                        <ul className={styles.footer__Links}>
                            {
                                stylesLoading ? <section style={{ margin: '1rem auto 0' }}>
                                    <AlternatingDotsLoader />
                                </section>
                                :
                                React.Children.toArray(
                                    popularStyles
                                    .map(style => {
                                        return <li
                                            key={style.id}
                                        >
                                            <Link href={''}>{style.name}</Link>
                                        </li>
                                    })
                                )
                            }
                        </ul>
                    </section>

                    <section className={styles.footer__Content__Wrap}>
                        <h4 className={styles.header}>Contact Us</h4>

                        <ul className={styles.footer__Links}>
                            <li>
                                <Link href={`mailto:${AppConstants.guruSupportMail}`}>Email: {AppConstants.guruSupportMail}</Link>
                            </li>
                            {/* <li>
                                <Link href={''}>Phone: +911 911 911</Link>
                            </li> */}
                        </ul>

                        <section className={styles.footer__Icons}>
                            <Link
                                href={''}
                            >
                                <MemoizedImage 
                                    src={facebookIcon}
                                    alt='facebook'
                                    className={styles.footer__Icon}
                                />
                            </Link>

                            <Link
                                href={AppConstants.socialLinks.instagram}
                                rel='noreferrer noopener'
                                target='_blank'
                            >
                                <MemoizedImage 
                                    src={instagramIcon}
                                    alt='instagram'
                                    className={styles.footer__Icon}
                                />
                            </Link>

                            <Link
                                href={''}
                            >
                                <MemoizedImage 
                                    src={tiktokIcon}
                                    alt='tiktok'
                                    className={styles.footer__Icon}
                                />
                            </Link>

                            <Link
                                href={AppConstants.socialLinks.youtube}
                                rel='noreferrer noopener'
                                target='_blank'
                            >
                                <MemoizedImage 
                                    src={youtubeIcon}
                                    alt='youtube'
                                    className={styles.footer__Icon}
                                />
                            </Link>
                        </section>
                    </section>
                </section>
            </section>

            <section className={styles.copyright__Wrap}>
                <div className={styles.copyright__Content}>
                    <p>©{new Date().getFullYear()} martialarts.guru</p>
                    <p>All rights reserved.</p>
                </div>
                
                <div className={styles.copyright__Content}>
                    <Button 
                        label='Terms of use'
                        handleClick={() => handleShowPDF('/terms-of-use.pdf')}
                        style={{
                            backgroundColor: 'transparent',
                            color: 'inherit',
                            fontSize: '0.7rem',
                            padding: 0,
                        }}
                    />

                    <Button 
                        label='Privacy Policy'
                        handleClick={() => handleShowPDF('/privacy-policy.pdf')}
                        style={{
                            backgroundColor: 'transparent',
                            color: 'inherit',
                            fontSize: '0.7rem',
                            padding: 0,
                        }}
                    />
                </div>
            </section>
        </footer>

        {
            showPdfViewer &&
            <PdfViewer 
                linkToPdfFile={pdfToShow}
                handleCloseViewer={handleClosePDFViewer}
            />
        }
    </>
}

export default Footer