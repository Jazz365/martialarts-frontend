import React, { CSSProperties } from 'react'
import styles from './styles.module.css'
import RequiredIndicator from '../../common/RequiredIndicator/RequiredIndicator';


const SelectItem = ({
    label='',
    labelFontSize,
    fontSize,
    options=[],
    value,
    handleChange=() => {},
    isDisabled=false,
    isRequired=false,
    style={},
    hideDefaultDisabledOption=false,
}: {
    label: string;
    labelFontSize?: string;
    fontSize?: string;
    options: {
        id: string | number;
        value: string | number;
        label: string;
        isDisabled?: boolean;
    }[];
    value?: string | number;
    handleChange?: (value: string) => void;
    isDisabled?: boolean;
    isRequired?: boolean;
    style?: CSSProperties;
    hideDefaultDisabledOption?: boolean;
}) => {
    return <>
        <label 
            className={styles.select__Wrap}
            style={style}
        >
            <span style={{
                fontSize: labelFontSize,
            }}>
                {label}
                {
                    isRequired ? <>
                        {' '}<RequiredIndicator />
                    </>
                    :
                    <></>
                }
            </span>

            <select
                onChange={({ target }) => handleChange(target.value)}
                value={value}
                style={{
                    fontSize,
                }}
                disabled={isDisabled}
            >
                {
                    hideDefaultDisabledOption ? 
                        <></>
                    :
                    <option 
                        disabled 
                        defaultChecked 
                        value={''}
                    >
                        Select option
                    </option>
                }

                {
                    React.Children.toArray(options.map(option => {
                        return <option 
                            key={option.id}
                            value={option.value}
                            disabled={option.isDisabled ?? false}
                        >
                            {option.label}
                        </option>
                    }))
                }
            </select>
        </label>
    </>
}

export default SelectItem