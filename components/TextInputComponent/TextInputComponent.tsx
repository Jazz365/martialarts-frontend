import React from 'react'
import styles from './styles.module.css'


const TextInputComponent = ({
    label='label',
    type='text',
    name='name',
    value='',
    onChange=()=>{},
}: {
    label?: string;
    type?: string;
    name?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <label className={styles.input__Wrap}>
            <span>{label}</span>
            <input 
                name={name}
                type={type}
                value={value}
                onChange={onChange}
            />
        </label>
    )
}

export default TextInputComponent