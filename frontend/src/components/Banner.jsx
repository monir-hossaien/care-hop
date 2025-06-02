import React from 'react';
import { motion } from 'framer-motion';

const Banner = ({ name }) => {
    return (
        <div className="relative h-48 flex justify-center items-center bg-[url(/images/hero_bg.jpg)] bg-center bg-cover bg-no-repeat">
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#57958C] opacity-40"></div>

            {/* Heading */}
            <motion.h1
                initial={{ opacity: 0, y: -100}}
                whileInView={{opacity: 1, y: 0, scale: 1}}
                transition={{duration: 0.6, ease: "easeOut"}}
                className="relative text-4xl text-white font-semibold">{name}</motion.h1>
        </div>
    );
};

export default Banner;
