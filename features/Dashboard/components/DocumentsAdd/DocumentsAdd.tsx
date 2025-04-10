'use client';


import React, { useMemo, useState } from 'react'
import styles from './styles.module.css'
import { IoMdAddCircle } from 'react-icons/io'
import { v4 as uuidv4 } from 'uuid';
import { IoClose } from 'react-icons/io5';
import Button from '@/components/buttons/Button/Button';
import TextInputComponent from '@/components/inputs/TextInputComponent/TextInputComponent';
import { IoTrashOutline } from 'react-icons/io5';
import useMobile from '@/hooks/useMobile';


const DocumentsAdd = ({
    items=[],
    updateItemsArr=()=>{},
}: {
    items: IPlaceDocuments[];
    updateItemsArr: (items: IPlaceDocuments[]) => void;
}) => {
    const [ isOver, setOver ] = useState(false);
    const isMobile = useMobile();

    const documents = useMemo<IPlaceDocuments[]>(() => {
        return items.filter(doc => doc.document_type === 'file');
    }, [items]);

    const documentLinks = useMemo<IPlaceDocuments[]>(() => {
        return items.filter(doc => doc.document_type === 'link');
    }, [items]);

    const handleFilesChange = async (files: FileList | null) => {
        if (!files) return;

        const items = Array.from(files).map(file => {
            return {
                id: uuidv4(),
                title: file.name,
                document: '',
                uploaded_at: new Date().toString(),
                document_type: 'file' as 'file',
                file,
                fileType: file.type,
            }
        });
        const updatedDocuments = [
            ...documents,
            ...items,
        ];
        
        updateItemsArr(updatedDocuments);
    }

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement> ) => {
        e.preventDefault();
        setOver(true);
    }

    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement> ) => {
        e.preventDefault();
        setOver(false);
    }

    const handleDrop = (e: React.DragEvent<HTMLLabelElement> ) => {
        e.preventDefault();
        e.stopPropagation();

        setOver(false);

        const data = e.dataTransfer.files; 
        handleFilesChange(data);
    }

    const handleDeleteFile = (id: string | number) => {
        updateItemsArr(items.filter(doc => doc.id !== id));
    }

    const handleAddNewDocumentLink = () => {
        const newDocumentLink: IPlaceDocuments = {
            id: uuidv4(),
            title: '',
            document: '',
            uploaded_at: new Date().toString(),
            document_link: '',
            document_type: 'link',
        }

        updateItemsArr([ ...items, newDocumentLink ]);
    }

    const handleSingleDocLinkUpdate = (
        id: string | number, 
        name: 'title' | 'document_link', 
        val: string
    ) => {
        const copyOfItems = items.slice();
        const foundDocLink = copyOfItems.find(item => item.id === id);
        if (!foundDocLink) return;

        foundDocLink[name] = val;

        updateItemsArr(copyOfItems);
    }
    
    return <>
        <section className={styles.wrapper}>
            <label 
                className={`${styles.file__label} ${isOver ? styles.over : ''}`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
            >
                <IoMdAddCircle
                    size={'4rem'}
                    cursor={'pointer'}
                    // fill='var(--primary-app-color)'
                />

                <input 
                    type='file'
                    className={styles.file__input}
                    onChange={({ target }) => handleFilesChange(target.files)}
                    multiple
                />
            </label>

            <section className={styles.documents_wrap}>
                {
                    React.Children.toArray(documents.map(document => {
                        return <p 
                            className={styles.single__Dco}
                            key={document.id}
                        >
                            <span>{document.title}</span>
                            
                            <IoClose 
                                onClick={() => handleDeleteFile(document.id)}
                                cursor={'pointer'}
                            />
                        </p>
                    }))
                }
            </section>
        </section>

        <section className={styles.links__Wrapper}>
            <h3 className={styles.link__Header}>Links</h3>

            {
                documentLinks.length > 0 &&
                <section className={styles.documents__LInks__Wrap}>
                    {
                        React.Children.toArray(documentLinks.map(docLink => {
                            return <>
                                <section 
                                    className={styles.single__Doc__Link}
                                    key={docLink.id}
                                >
                                    <TextInputComponent 
                                        label='title'
                                        value={docLink.title}
                                        onChange={(_name, val) => handleSingleDocLinkUpdate(docLink.id, 'title', val)}
                                        borderRadius='12px'
                                        labelFontSize='0.85rem'
                                        style={{
                                            width: '30%'
                                        }}
                                    />

                                    <TextInputComponent 
                                        label='link'
                                        value={docLink.document_link ?? ''}
                                        onChange={(_name, val) => handleSingleDocLinkUpdate(docLink.id, 'document_link', val)}
                                        borderRadius='12px'
                                        labelFontSize='0.85rem'
                                        style={{
                                            width: isMobile ? 'calc(100% - 30% - 1rem)' : undefined
                                        }}
                                    />

                                    <IoTrashOutline 
                                        size={'1.8rem'}
                                        color='#f90000'
                                        cursor={'pointer'}
                                        onClick={() => handleDeleteFile(docLink.id)}
                                        style={{
                                            display: isMobile ? 'none' : 'block'
                                        }}
                                    />

                                    <div 
                                        className={styles.mob__Add__Title}
                                        onClick={() => handleDeleteFile(docLink.id)}
                                    >
                                        <span>Delete link</span>
                                        <IoTrashOutline
                                            size={'0.65rem'}
                                            color='#f90000'
                                        />
                                    </div>
                                </section>
                            </>
                        }))
                    }
                </section>
            }

            <Button
                label='HEALTH DECLARATION'
                style={{
                    padding: '0.5rem 1.5rem',
                    fontSize: '0.75rem',
                    width: 'max-content',
                    backgroundColor: 'transparent',
                    border: '1px solid #000',
                    color: '#000',
                }}
                hoverStyle={{
                    backgroundColor: 'var(--primary-app-color)',
                    borderColor: 'var(--primary-app-color)',
                    color: '#fff'
                }}
                handleClick={handleAddNewDocumentLink}
            />
        </section>
    </>
}

export default DocumentsAdd;