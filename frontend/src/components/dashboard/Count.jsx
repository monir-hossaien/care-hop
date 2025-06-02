import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const Count = ({ title, count, icon, className }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`${className} rounded-md shadow-sm p-6 flex items-center justify-between`}
        >
            <div>
                <h5 className="text-sm font-medium text-gray-500">{title}</h5>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                    <CountUp end={count || 0} duration={2} />
                </p>
            </div>
            <div className="rounded-full p-3 bg-indigo-200 text-indigo-100">
                {icon}
            </div>
        </motion.div>
    );
};

export default Count;
