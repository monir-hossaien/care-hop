import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

const OurGoals = () => {
    return (
        <div className="py-24 px-4 md:px-0">
            <div className="container text-gray-500">

                {/* Heading Section */}
                <motion.div
                    className="text-center space-y-3 md:px-44"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-4xl font-bold text-[#164193]">Why did we start?</h1>
                    <p>
                        BD Doctor aims to break down barriers for revolutionary and transformative change and create a
                        healthcare system that is sustainable, progressive, effective, and worthy for the people of
                        Bangladesh.
                    </p>
                </motion.div>

                {/* Cards Section */}
                <div className="grid grid-cols-12 mt-14 gap-6">
                    {[
                        {
                            icon: '/images/Icon-01.png',
                            title: 'Our Mission',
                            desc: 'To create a feasible and suitable connection and synergy between doctors and patients at the highest quality through state-of-the-art technology.',
                        },
                        {
                            icon: '/images/Icon-02.png',
                            title: 'Our Vision',
                            desc: 'To utilize this integrated platform and become the leader in allocating healthcare services where and when required.',
                        },
                        {
                            icon: '/images/Icon-03.png',
                            title: 'Our Values',
                            desc: 'We believe in providing a variety of available choices while ensuring the best quality with the most necessary information to spread the positivity of better health to everyone in the most innovative and integral way.',
                        },
                        {
                            icon: '/images/Icon-04.png',
                            title: 'Our Commitment',
                            desc: 'In the present and for the future, we are committed to utilizing all our available resources for the people and their health and wellness.',
                        },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="col-span-12 md:col-span-6 shadow-sm px-8 py-9 rounded-lg bg-white"
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="space-y-3">
                                <img src={item.icon} alt="icon" />
                                <h4 className="text-2xl font-bold text-[#1CA288]">{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurGoals;
