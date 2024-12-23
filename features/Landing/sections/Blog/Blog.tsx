'use client';

import React from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import Image from 'next/image'
import FadeInOnScroll from '@/components/FadeInOnScroll/FadeInOnScroll'
import Button from '@/components/Button/Button'
import { useAppContext } from '@/contexts/AppContext';
import sampleImage1 from '../../../../assets/blogSamples/blog-1.png';
import PageLoader from '@/components/PageLoader/PageLoader';


const maxArticleTitleLength = 40;

const Blog = () => {
    const { blogs, blogsLoading } = useAppContext();
    return <>
        <section className={styles.content__Wrap}>
            <FadeInOnScroll>
                <section className={styles.header__Row}>
                    <h2 className={styles.header}>Stories from our blog</h2>

                    {/* <Button 
                        label='read more'
                        useLink={true}
                        linkLocation={'/blog'}
                        style={{
                            border: '1px solid #000',
                            backgroundColor: 'transparent',
                            color: '#000'
                        }}
                    /> */}
                </section>
            </FadeInOnScroll>

            <FadeInOnScroll>
                {
                    blogsLoading ? <>
                        <PageLoader />
                    </>
                    :
                    <section className={styles.blog__Wrap}>
                        {
                            React.Children.toArray(blogs.map(blog => {
                                return <Link
                                    href={`/blog/${blog.slug}`}
                                    className={styles.blog__Article}
                                    key={blog.id}
                                >
                                    <Image 
                                        alt={blog.title}
                                        src={sampleImage1}
                                        className={styles.article__Img}
                                    />

                                    <div className={styles.mask}>
                                        <h3 className={`${styles.header} ${styles.article__Title}`}>
                                            {
                                                blog.title.length > maxArticleTitleLength ?
                                                    blog.title.slice(0, maxArticleTitleLength) + '...'
                                                :
                                                blog.title
                                            }
                                        </h3>

                                        <div className={styles.article__Footer}>
                                            {/* <p>{new Date(blog.created_at).toString().split(' ').slice(0, 4).join(' ')}</p>
                                            <p>.</p> */}
                                            <p>{5} minute read</p>
                                        </div>
                                    </div>
                                </Link>
                            }))
                        }
                    </section>
                }
            </FadeInOnScroll>
        </section>
    </>
}

export default Blog