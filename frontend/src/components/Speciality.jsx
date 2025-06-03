import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { specialitiesStore } from "../store/specialitiesStore.js";
import SpecialitySkeleton from "../skeleton/specialitySkeleton.jsx";
import Banner from "./Banner.jsx";
import { motion } from 'framer-motion';

const Speciality = () => {
    const location = useLocation();
    const { specialities, fetchSpecialtiesList } = specialitiesStore();

    useEffect(() => {
        (async () => {
            await fetchSpecialtiesList();
        })();
    }, []);

    return (
        <div className="overflow-x-hidden">
            {
                location.pathname === "/specialities" ? (
                    <Banner name={"Doctor Specialties"} />
                ) : (
                    <div className="text-center mt-10 px-4">
                        <motion.h1
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-3xl md:text-5xl text-[#164193] font-bold"
                        >
                            View Doctors by Specialities
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="uppercase py-3 font-bold text-[#00B092] tracking-widest"
                        >
                            Specialities
                        </motion.p>
                    </div>
                )
            }

            {/* Grid Section */}
            <div className="container mx-auto px-4 sm:px-0">
                {
                    specialities === null ? (
                        <SpecialitySkeleton />
                    ) : (
                        <div className="grid grid-cols-12 gap-5 py-14">
                            {
                                specialities.data.map((speciality) => {
                                    const { _id, name, description, image } = speciality;
                                    return (
                                        <motion.div
                                            initial={{ opacity: 0, y: 100, scale: 0.95 }}
                                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                            className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
                                            key={_id}
                                        >
                                            <Link to={`/department/${name}/${_id}`}>
                                                <div className="shadow-sm rounded-lg text-gray-600 px-4 py-8 flex flex-col items-center space-y-4 hover:bg-[#164193] hover:text-white transition-all duration-300 hover:scale-[1.02]">
                                                    <img
                                                        className="w-28 max-w-[7rem] bg-white rounded-full p-4"
                                                        src={image}
                                                        alt={name}
                                                    />
                                                    <h3 className="text-center text-lg font-extrabold text-[#1BA288] group-hover:text-white transition-all duration-300">
                                                        {name}
                                                    </h3>
                                                    <p className="text-sm text-center">{description}</p>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    );
                                })
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Speciality;
