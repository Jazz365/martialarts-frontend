import React, { CSSProperties } from 'react'
import styles from './styles.module.css'
import RequiredIndicator from '../RequiredIndicator/RequiredIndicator';


const TextInputComponent = ({
    label='',
    type='text',
    name='name',
    value='',
    onChange=()=>{},
    isTextArea=false,
    borderRadius,
    placeholder='',
    labelFontSize,
    isDisabled=false,
    style,
    checked=false,
    handleUpdateChecked=()=>{},
    isRequired=false,
}: {
    label?: string;
    type?: string;
    name?: string;
    value?: string;
    onChange?: (targetName: string, targetValue: string) => void;
    isTextArea?: boolean;
    borderRadius?: string;
    placeholder?: string;
    labelFontSize?: string;
    isDisabled?: boolean;
    style?: CSSProperties;
    checked?: boolean;
    handleUpdateChecked?: (val: boolean) => void;
    isRequired?: boolean;
}) => {
    return (
        <label 
            className={styles.input__Wrap}
            style={style}
        >
            {
                label.length > 0 ?
                    <span
                        style={{
                            fontSize: labelFontSize,
                        }}
                    >
                        {label}
                        {
                            isRequired ? <>
                                {' '}<RequiredIndicator />
                            </>
                            :
                            <></>
                        }
                    </span>
                :
                <></>
            }
            
            {
                isTextArea ?
                    <textarea
                        name={name}
                        value={value}
                        onChange={({ target }) => onChange(name, target.value)}
                        rows={5}
                        style={{
                            borderRadius
                        }}
                        placeholder={placeholder}
                        disabled={isDisabled}
                        readOnly={isDisabled}
                    ></textarea>
                :      
                <input 
                    name={name}
                    type={type}
                    value={value}
                    onChange={({ target }) => {
                        if (type === 'checkbox') return handleUpdateChecked(target.checked);
                        onChange(name, target.value)
                    }}
                    style={{
                        borderRadius
                    }}
                    placeholder={placeholder}
                    disabled={isDisabled}
                    readOnly={isDisabled}
                    checked={checked}
                />
            }
        </label>
    )
}

export default TextInputComponent