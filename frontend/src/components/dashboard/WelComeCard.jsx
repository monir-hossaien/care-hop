import React from 'react';
import {motion} from "framer-motion";

const WelcomeCard = ({name}) => {

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    return (
        <motion.div
            initial={{opacity: 0, y: 100}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="py-3">
            <div className="bg-indigo-50 shadow-sm rounded-md p-4 max-w-md w-full text-gray-700">
                <h1 className="text-2xl font-bold mb-3">🌤️{getGreeting()}, {name || "Guest"}</h1>
                <p className="text-base leading-relaxed">
                    {/*Your next appointment is at <span className="font-semibold">{nextTime}</span> with{' '}*/}
                    {/*<span className="font-semibold">{nextPatient}</span>*/}
                </p>
            </div>
        </motion.div>
    );
};

export default WelcomeCard;
