import React from 'react'
import styles from './styles.module.css'
import { dummyBlogArticles } from './utils'
import Link from 'next/link'
import Image from 'next/image'
import FadeInOnScroll from '@/components/FadeInOnScroll/FadeInOnScroll'


const maxArticleTitleLength = 65;

const Blog = () => {
    return <>
        <section className={styles.content__Wrap}>
            <FadeInOnScroll>
                <h2 className={styles.header}>Stories from our blog</h2>
            </FadeInOnScroll>

            <FadeInOnScroll>
                <section className={styles.blog__Wrap}>
                    {
                        React.Children.toArray(dummyBlogArticles.map(article => {
                            return <Link
                                href={article.link}
                                className={styles.blog__Article}
                            >
                                <Image 
                                    alt={article.name}
                                    src={article.image}
                                    className={styles.article__Img}
                                />

                                <div className={styles.mask}>
                                    <h3 className={`${styles.header} ${styles.article__Title}`}>
                                        {
                                            article.name.length > maxArticleTitleLength ?
                                                article.name.slice(0, maxArticleTitleLength) + '...'
                                            :
                                            article.name
                                        }
                                    </h3>

                                    <div className={styles.article__Footer}>
                                        <p>{article.createdAt.toString().split(' ').slice(0, 4).join(' ')}</p>
                                        <p>.</p>
                                        <p>{article.lengthOfReadInMinutes} minute read</p>
                                    </div>
                                </div>
                            </Link>
                        }))
                    }
                </section>
            </FadeInOnScroll>
        </section>
    </>
}

export default Blog