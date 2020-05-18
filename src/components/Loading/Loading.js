import React from 'react';
import { DualRing } from 'react-spinners-css';
import './Loading.css';

const Loading = () =>{ 

    return (
        <div id="loadingContainer">
            <DualRing size={200} color={"#EB301F"}/>
        </div>
    );
};

export default Loading;