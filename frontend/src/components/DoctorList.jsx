import React, { useState } from 'react';
import { doctorStore } from "../store/doctorStore.js";
import AppointmentModal from "./modal/AppointmentModal.jsx";
import DoctorSkeleton from "../skeleton/doctorSkeleton.jsx";
import { useLocation } from "react-router-dom";
import { commonStore } from "../store/commmonStore.js";
import NotFound from "./NotFound.jsx";
import { motion } from 'framer-motion';

const DoctorList = () => {
    const { doctorList } = doctorStore();
    const { loading } = commonStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const location = useLocation();

    const isSearchPage = location.pathname === "/search-doctor" || location.pathname === "/search";
    const noDoctors = doctorList?.length === 0;

    const handleModalOpen = (doctor) => {
        setIsModalOpen(true);
        setSelectedDoctor(doctor);
    };

    return (
        <>
            <div className="grid grid-cols-12 gap-5 py-5">
                {doctorList === null ? (
                    isSearchPage ? (
                        loading ? <DoctorSkeleton/> :
                            <p className="col-span-12 text-center text-gray-600 text-sm">Search to get specialist doctor information !!</p>
                    ) : (
                        <DoctorSkeleton/>
                    )
                ) : noDoctors ? (
                    <div className="col-span-12 text-center">
                        <NotFound message="No Doctor Found" />
                    </div>
                ) : (
                    doctorList.map((doctor) => {
                        const { _id, name, image, degrees, specialities } = doctor;
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 100}}
                                whileInView={{opacity: 1, y: 0, scale: 1}}
                                transition={{duration: 0.6, ease: "easeOut"}}
                                className="col-span-12 md:col-span-6" key={_id}>
                                <div className="bg-white border border-gray-300 shadow-sm rounded w-full flex flex-col sm:flex-row items-center sm:items-start px-5 py-8 gap-6 group">
                                    <div className="w-44 h-44 flex justify-center items-center rounded-full bg-[#EFEFEF] shrink-0">
                                        <img
                                            src={image}
                                            className="w-44 h-44 rounded-full object-cover"
                                            alt="Doctor"
                                        />
                                    </div>
                                    <div className="space-y-2 md:space-y-3 text-sm w-full">
                                        <div>
                                            <h2 className="text-xl font-bold text-[#164193]">{name}</h2>
                                            <p className="text-gray-500">{degrees}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Specialities:</p>
                                            <p className="text-gray-500">{specialities?.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Working in:</p>
                                            <p className="text-gray-500">{doctor?.hospitalDetails?.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Working Area:</p>
                                            <p className="text-gray-500">{doctor?.hospitalDetails?.area}</p>
                                        </div>
                                        <div className="md:hidden md:group-hover:block mt-5">
                                            <button
                                                onClick={() => handleModalOpen(doctor)}
                                                className="cursor-pointer px-8 py-2 bg-sky-50 outline-0 rounded-lg text-gray-500 font-bold hover:bg-sky-100 duration-300"
                                            >
                                                Book Appointment
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>

            {isModalOpen && (
                <AppointmentModal
                    doctor={selectedDoctor}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
};

export default DoctorList;
