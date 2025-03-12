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
import MemoizedImage from '@/components/common/MemoizedImage/MemoizedImage';
import Loader from '@/components/loaders/Loader/Loader';
import AlternatingDotsLoader from '@/components/loaders/AlternatingDotsLoader/AlternatingDotsLoader';
import Button from '@/components/buttons/Button/Button';
import PdfViewer from '@/components/common/PdfViewer/PdfViewer';
import TermsPopup from '@/components/popups/TermsPopup/TermsPopup';
import PrivacyPopup from '@/components/popups/PrivacyPopup/PrivacyPopup';
import { listingSortOptions, listingViewTypes } from '@/features/Search/sections/Places/utils';
import Faqs from '@/features/Landing/sections/Faqs/Faqs';

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
                        Martial Arts Classes to Build Strength and Confidence
                        {/* Bringing You the Best Martial Arts Studios and Classes Near You */}
                    </p>

                    <Faqs />
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
                                stylesLoading ? <>
                                    <section style={{ margin: '1rem auto 0' }}>
                                        <AlternatingDotsLoader />
                                    </section>
                                </>
                                :
                                React.Children.toArray(
                                    popularStyles
                                    .map(style => {
                                        return <li
                                            key={style.id}
                                        >
                                            <Link
                                                href={`/search?style_id=${encodeURIComponent(style.id)}&view=${listingViewTypes.listView}&sort=${listingSortOptions.sort_by_newest}`}
                                            >
                                                {style.name}
                                            </Link>
                                        </li>
                                    })
                                )
                            }
                        </ul>
                    </section>

                    <section className={styles.footer__Content__Wrap}>
                        <h4 className={styles.header}>Contact Us</h4>

                        <ul className={`${styles.footer__Links} ${styles.no__Transform}`}>
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
                    <TermsPopup />
                    <PrivacyPopup />
                </div>
            </section>
        </footer>

        {
            // showPdfViewer &&
            // <TermsPopup 
            //     triggerElem={}
            // />
            // <PdfViewer 
            //     linkToPdfFile={pdfToShow}
            //     handleCloseViewer={handleClosePDFViewer}
            // />
        }
    </>
}

export default Footer