import React, {PropTypes} from 'react';

const Loading = (props)=>{
    return(
        <div className="ui active transition visible inverted dimmer" style={{marginTop:'30%'}}>
            <div className="content">
                <div className="center">
                <div className={`ui ${props.mode} text loader`}>Loading</div>
                </div>
            </div>
        </div>
    );
};

export default Loading;