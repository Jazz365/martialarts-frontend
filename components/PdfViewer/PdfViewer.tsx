'use client';


import React, { useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import styles from './styles.module.css';
import { AiOutlineClose } from 'react-icons/ai';
import useClickOutside from '@/hooks/useClickOutside';
import PageLoader from '../loaders/PageLoader/PageLoader';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const maxWidth = 950;


const PdfViewer = ({
    linkToPdfFile,
    handleCloseViewer=() => {}
}: {
    linkToPdfFile?: string | null;
    handleCloseViewer: () => void;
}) => {
    const [numPages, setNumPages] = useState<number>();
    const [loading, setLoading] = useState(true);

    const contentRef = useRef<HTMLDivElement>(null);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
        setLoading(false);
    }

    useClickOutside({
        elemRef: contentRef,
        handleClickOutside: () => handleCloseViewer(),
    });

    if (!linkToPdfFile) return <></>

    return (
        <section className={styles.wrapper}>
            <AiOutlineClose 
                size={'1.5rem'}
                className={styles.close__icon}
                onClick={handleCloseViewer}
            />
            <section className={styles.content} ref={contentRef}>
                <Document 
                    file={linkToPdfFile} 
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={loading}
                >
                    {
                        loading ? 
                            <PageLoader /> 
                        :
                        Array.from(new Array(numPages), (_el, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                width={maxWidth}
                            />
                        ))
                    }
                </Document>
            </section>
        </section>
    )
}

export default PdfViewer