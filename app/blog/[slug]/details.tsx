'use client';


import React, { useEffect, useState } from 'react'
import blogImg from '../../../assets/blogSamples/blog-1.webp';
import styles from './styles.module.css';
import PageLoader from '@/components/loaders/PageLoader/PageLoader';
import { BlogService } from '@/services/blogService';
import facebookIcon from '../../../assets/icons/facebook.webp';
import whatsappIcon from '../../../assets/icons/whatsapp.webp';
import BackButton from '@/components/buttons/BackButton/BackButton';
import Link from 'next/link';
import sampleImage1 from '../../../assets/blogSamples/blog-1.webp';
import NavigationBar from '@/layouts/NavigationBar/NavigationBar';
import useMobile from '@/hooks/useMobile';
import { copyToClipboard, estimateReadingTime, shareLinkToSocialMedia } from '@/helpers/helpers';
import { IoCopyOutline } from 'react-icons/io5';
import { toast } from 'sonner';
import MemoizedImage from '@/components/common/MemoizedImage/MemoizedImage';
import { useBlogContext } from '@/contexts/BlogContext';


const SingleBlogDetails = ({
  slug,
}: {
  slug: string;
}) => {
  const [ loading, setLoading ] = useState(true);
  const [ blogDetails, setBlogDetails ] = useState<IBlog | null>(null);
  const isMobile = useMobile();

  const {
    blogs,
    blogsLoading,
  } = useBlogContext()

  const blogService = new BlogService();

  useEffect(() => {
    const foundBlog = blogs.find(blog => blog.slug === slug);
    if (foundBlog) {
      setBlogDetails(foundBlog);
      setLoading(false);
      return
    }
    
    blogService.getSingleBlog(slug).then(res => {
      setBlogDetails(res);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    })
  }, [])

  const handleCopyLink = async () => {
    try {
      await copyToClipboard(window.location.href);
      toast.success('Successfully copied link to clipboard!');
    } catch (error) {}
  }

  return <>
    <NavigationBar
      wrapperStyle={{
        padding: isMobile ? 
          undefined
        :
        '1rem 5rem'
      }}
    />
    <section className={styles.wrapper}>
      <BackButton />
      
      <br />

      <section className={styles.blog__Detail__Content}>
        <MemoizedImage
          src={blogImg}
          alt='blog'
          priority
          width={0}
          height={650}
          className={styles.blog__Img}
        />

        {
          loading ?
            <PageLoader />
          :
          !blogDetails ? <></>
          :
          <>
            <section className={styles.top__Row}>
              <h3 className={styles.blog__Title}>{blogDetails.title}</h3>
              <section className={styles.blog__Title__Footer}>
                <div className={`${styles.article__Footer} ${styles.top}`}>
                  {/* <p>{new Date(blogDetails.created_at).toString().split(' ').slice(0, 4).join(' ')}</p>
                  <p>.</p> */}
                  <p>{estimateReadingTime(blogDetails.content.length)} minute read</p>
                </div>

                <div className={styles.share__Wrap}>
                  <p>Share: </p>

                  <MemoizedImage 
                    src={facebookIcon}
                    alt='icon'
                    width={isMobile ? 20 : 30}
                    height={isMobile ? 20 : 30}
                    style={{
                      objectFit: 'cover',
                      borderRadius: '50%',
                      cursor: 'pointer',
                    }}
                    onClick={() => shareLinkToSocialMedia('facebook', window.location.href)}
                  />

                  <MemoizedImage 
                    src={whatsappIcon}
                    alt='icon'
                    width={isMobile ? 20 : 30}
                    height={isMobile ? 20 : 30}
                    style={{
                      objectFit: 'cover',
                      borderRadius: '50%',
                      cursor: 'pointer',
                    }}
                    onClick={() => shareLinkToSocialMedia('whatsapp', window.location.href)}
                  />

                  <IoCopyOutline 
                    size={isMobile ? 20 : 15}
                    cursor={'pointer'}
                    onClick={() => handleCopyLink()}
                  />
                </div>
              </section>
            </section>

            <section className={styles.content__Detail}>
              <div
                dangerouslySetInnerHTML={{
                  __html: blogDetails.content
                }}
                style={{
                  width: '100%',
                  whiteSpace: 'pre-line'
                }}
              ></div>

              <section className={styles.other__Stories}>
                <h3 className={styles.other__Story__Header}>Other stories</h3>

                <section className={styles.blog__Wrap}>
                  {
                    blogsLoading ?
                      <PageLoader />
                    :
                    React.Children.toArray(blogs
                      .filter(blog => blog.slug !== slug)
                      .map(blog => {
                        return <Link
                          href={`/blog/${blog.slug}`}
                          className={styles.blog__Article}
                          key={blog.id}
                        >
                          <MemoizedImage
                            alt={blog.title}
                            src={sampleImage1}
                            className={styles.article__Img}
                          />

                          <div className={styles.mask}>
                            <h3 className={`${styles.header} ${styles.article__Title}`}>
                              {blog.title}
                            </h3>

                            <div className={styles.article__Footer}>
                              {/* <p>{new Date(blog.created_at).toString().split(' ').slice(0, 4).join(' ')}</p>
                              <p>.</p> */}
                              <p>{estimateReadingTime(blogDetails.content.length)} minute read</p>
                            </div>
                          </div>
                        </Link>
                      })
                    )
                  }
                </section>
              </section>
            </section>
          </>
        }
      </section>
    </section>
  </>
}

export default SingleBlogDetails