'use client';


import React, { useState } from 'react'
import styles from './styles.module.css'
import { IoMdAddCircle } from 'react-icons/io'
import { v4 as uuidv4 } from 'uuid';
import { IoClose } from 'react-icons/io5';

interface DocumentItem {
    id: string | number;
    name: string;
    file: object
}

const DocumentsAdd = () => {
    const [ isOver, setOver ] = useState(false);
    const [ documents, setDocuments ] = useState<DocumentItem[]>([]);

    const handleFilesChange = async (files: FileList | null) => {
        if (!files) return;

        const items = Array.from(files).map(file => {
            return {
                id: uuidv4(),
                name: file.name,
                file,
            }
        });
        const updatedDocuments = [
            ...documents,
            ...items,
        ];
        
        setDocuments(updatedDocuments);
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
        setDocuments((prevDocs) => prevDocs.filter(doc => doc.id !== id));
    }
    
    return (
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
                />

                <input 
                    type='file' 
                    accept='image/*'
                    className={styles.file__input}
                    onChange={({ target }) => handleFilesChange(target.files)}
                    multiple
                />
            </label>

            <section className={styles.documents_wrap}>
                {
                    React.Children.toArray(documents.map(document => {
                        return <p className={styles.single__Dco}>
                            <span>{document.name}</span>
                            
                            <IoClose 
                                onClick={() => handleDeleteFile(document.id)}
                                cursor={'pointer'}
                            />
                        </p>
                    }))
                }
            </section>
        </section>
    )
}

export default DocumentsAdd