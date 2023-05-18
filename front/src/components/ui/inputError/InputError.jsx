import React from 'react';

const InputError = ({errors, name}) => {
    if(!errors[name]) {
        return
    }
    return <p style={{color: 'pink', marginTop: '-10px'}}>{errors[name].message}</p>
};

export default InputError;
