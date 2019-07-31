import React from 'react';
import './FormControls.scss'

export const Input = ({input, meta, ...props}) => {
    let hasError = meta.error && meta.touched;
    return(
        <div className={`form-controls ${hasError && 'error'}`}>
            <div>
                <input {...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
};