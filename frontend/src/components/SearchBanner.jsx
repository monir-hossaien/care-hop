import React from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const SearchBanner = () => {
    return (
        <div className="bg-[#08376B] w-full">
            <div className="w-full max-w-3xl mx-auto px-4 py-20 md:py-28 text-center space-y-5">
                <motion.h5
                    initial={{ opacity: 0, y: -100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-[#00B092] uppercase tracking-widest font-medium text-sm sm:text-base"
                >
                    Search Hospitals
                </motion.h5>

                <motion.h1
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-white text-2xl sm:text-4xl font-bold"
                >
                    Find your Doctor or Hospital right now
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-white text-sm sm:text-base"
                >
                    Find Doctor, Find Hospital
                </motion.p>

                <Link
                    to="/search-doctor"
                    className="inline-block px-8 py-3 bg-[#00B092] text-sm sm:text-base text-white rounded-md hover:bg-[#009578] transition-all duration-300"
                >
                    Search Your Doctor
                </Link>
            </div>
        </div>
    );
};

export default SearchBanner;
