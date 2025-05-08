import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchTab from './SearchTab.jsx';

const sliders = [
    {
        image: "https://bddoctor.com/images/banner/DoctorPatient.png",
        content: "Promising better health and well-being!",
        short_des: "Our ambition is to give people a better chance of a happier life"
    },
    {
        image: "https://bddoctor.com/images/banner/Doc-Group.png",
        content: "Fostering well-being and a healthier tomorrow!",
        short_des: "Empowering lives for a brighter and happier future"
    },
    {
        image: "https://bddoctor.com/images/banner/Male-Doc.png",
        content: "Transforming lives through Compassionate Care!",
        short_des: "Committed to being your trusted partner in health & well-being"
    }
];

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sliders.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <div className="relative">
            {/* Hero Section */}
            <div className="relative h-screen py-9 px-3 bg-[url(/images/hero_bg.jpg)] bg-center bg-cover bg-no-repeat flex items-center">
                {/* Overlay */}
                <div className="absolute inset-0 bg-[#57958C] opacity-40 z-10"></div>

                <div className="relative z-20 flex flex-col md:flex-row items-center gap-5 w-full">
                    {/* Image Section */}
                    <div className="w-full h-full md:h-auto md:w-1/2">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={sliders[currentIndex].image}
                                src={sliders[currentIndex].image}
                                alt="Slide"
                                className="w-full h-auto"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.6 }}
                            />
                        </AnimatePresence>
                    </div>

                    {/* Text Section */}
                    <div className="w-full md:w-1/2 text-[#00B092]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={sliders[currentIndex].content}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-2xl md:text-6xl font-bold md:leading-20">
                                    {sliders[currentIndex]?.content}
                                </h2>
                                <p className="mt-4 text-lg text-[#164193]">{sliders[currentIndex]?.short_des}</p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* SearchTab remains here below the hero section */}
            <div className="relative z-50">
                <SearchTab />
            </div>
        </div>
    );
};

export default Hero;
