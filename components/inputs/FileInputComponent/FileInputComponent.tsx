import React, { CSSProperties } from 'react'
import styles from './styles.module.css'
import RequiredIndicator from '../../common/RequiredIndicator/RequiredIndicator';

const FileInputComponent = ({
    label,
    labelFontSize,
    onChange=()=>{},
    accept,
    isRequired=false,
    style={},
    ref,
}: {
    label?: string;
    labelFontSize?: string;
    onChange?: (files: FileList | null) => void;
    accept?: string;
    isRequired?: boolean;
    style?: CSSProperties;
    ref?: React.RefObject<HTMLLabelElement>;
}) => {
    return <>
        <label 
            className={styles.input__Wrap}
            ref={ref}
            style={style}
        >
            {
                label ?
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

            <input
                type='file'
                onChange={({ target }) => onChange(target.files)}
                accept={accept}
            />
        </label>
    </>
}

export default FileInputComponent