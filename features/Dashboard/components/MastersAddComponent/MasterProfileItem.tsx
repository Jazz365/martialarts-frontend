'use client';


import FileInputComponent from '@/components/inputs/FileInputComponent/FileInputComponent'
import React, { useRef } from 'react'
import styles from './styles.module.css'
import Button from '@/components/buttons/Button/Button';
import { IoPencilOutline } from 'react-icons/io5';
import emptyUserPic from '../../../../assets/avatar.png'
import MemoizedImage from '@/components/common/MemoizedImage/MemoizedImage';

const MasterProfileItem = ({
    index=-1,
    updateSingleItem=()=>{},
    masterImage,
}: {
    index: number;
    masterImage?: string;
    updateSingleItem?: (itemIndex: number, value: string | File, key: string) => void;
}) => {
    const inputRef = useRef<HTMLLabelElement>(null);

    return <>
        <section className={styles.profile__Wrap}>
            <MemoizedImage
                src={
                    masterImage && masterImage?.length > 0 ?
                        masterImage
                    :
                    emptyUserPic
                }
                alt='user'
                width={120}
                height={120}
                style={{
                    objectFit: 'cover',
                    borderRadius: '50%',
                    willChange: 'unset',
                    contentVisibility: 'unset',
                    contain: 'unset',
                }}
            />

            <Button
                label='edit'
                icon={<IoPencilOutline size={'0.8rem'} />}
                style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.65rem',
                    gap: '0.4rem',
                    border: '1px solid #000',
                    color: '#000',
                    backgroundColor: 'transparent',
                }}
                hoverStyle={{
                    backgroundColor: 'var(--primary-app-color)',
                    borderColor: 'var(--primary-app-color)',
                    color: '#fff'
                }}
                handleClick={() => inputRef.current?.click()}
            />
        </section>
        
        <FileInputComponent
            label='image'
            labelFontSize='0.8rem'
            accept='image/*'
            onChange={(files) => {
                if (files && files[0]) {
                    updateSingleItem(index, files[0], 'imageFile')
                }
            }}
            style={{
                display: 'none',
            }}
            isRequired
            ref={inputRef}
        />
    </>
}

export default MasterProfileItem