import React from 'react';
import { FaCheck } from "react-icons/fa6";
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="bg-[#EDF8FA] min-h-screen py-10">
            <div className="container px-4 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                    {/* Text Content */}
                    <motion.div
                        className="flex flex-col justify-center space-y-6"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-[#164193] leading-tight">
                            Good Health Is Always Our <span className="text-[#1CA288]">Priority.</span>
                        </h2>

                        <div className="flex items-start gap-4">
                            <FaCheck className="text-[#1CA288] text-5xl" />
                            <p className="text-gray-700">
                                Focusing on our health is the biggest aspect of our life. Patients often require the
                                swiftest, most efficient, and most trusted service to feel secure in their well-being.
                                On the other hand, doctors seek to provide their essential service to save lives and
                                improve overall health in the most convenient manner.
                            </p>
                        </div>

                        <div className="flex items-start gap-4">
                            <FaCheck className="text-[#1CA288] text-5xl" />
                            <p className="text-gray-700">
                                In this regard, BD Doctor has been created to bridge the gap between patients and doctors
                                in the best way possible while potentially making healthcare much more accessible. With
                                only a few clicks on BDDoctor.com, you will find the right doctors, the right hospitals,
                                and the best care.
                            </p>
                        </div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        className="w-full"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <img className="w-full h-auto object-contain" src="/images/large-pic2.png" alt="Healthcare service" />
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default About;
