import React from 'react';

const Banner = ({ name }) => {
    return (
        <div className="relative h-48 flex justify-center items-center bg-[url(/images/hero_bg.jpg)] bg-center bg-cover bg-no-repeat">
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#57958C] opacity-40"></div>

            {/* Heading */}
            <h1 className="relative text-4xl text-white font-semibold">{name}</h1>
        </div>
    );
};

export default Banner;
