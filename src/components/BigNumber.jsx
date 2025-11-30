import React from 'react';

const BigNumber = ({ number, className = "" }) => {
    return (
        <div className={`text-[12rem] md:text-[16rem] font-bold text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] handwriting leading-none select-none ${className}`}>
            {number}
        </div>
    );
};

export default BigNumber;
