import React from 'react';
import loading from '../../img/loading.svg'
import './../../App.scss'

const Preloader = () => {
    return(
        <div className={'preloader'}><img src={loading}/></div>
    )
};

export default Preloader;