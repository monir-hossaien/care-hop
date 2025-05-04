import React, {useEffect, useState} from 'react';
import { doctorStore } from "../store/doctorStore.js";
import AppointmentModal from "./AppointmentModal.jsx";


const DoctorList = () => {
    const { doctorList} = doctorStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const handleModalOpen = (doctor) => {
        setIsModalOpen(true);
        setSelectedDoctor(doctor);
    };

    return (
        <>
            <div className="grid grid-cols-12 gap-5 px-4 md:px-0 py-5">
                {doctorList === null ? (
                    <p className="col-span-12 text-center text-gray-600 text-sm">Loading....</p>
                ) : doctorList.length === 0 ? (<p className="col-span-12 text-center text-gray-600 text-sm">No Doctor found!</p>)  : (
                    doctorList.map((doctor) => {
                        const { _id, image, name, degrees, specialities} = doctor;
                        return (
                            <div className="col-span-12 md:col-span-6" key={_id}>
                                <div className="bg-white border border-gray-300 shadow-sm rounded w-full flex flex-col sm:flex-row items-center sm:items-start px-5 py-8 gap-6 group">
                                    <div className="w-44 h-44 flex justify-center items-center rounded-full bg-[#EFEFEF] shrink-0">
                                        <img
                                            src={image}
                                            className="w-44 h-44 rounded-full object-cover"
                                            alt="image"
                                        />
                                    </div>
                                    <div className="space-y-2 md:space-y-3 text-sm w-full">
                                        <div>
                                            <h2 className="text-xl font-bold text-[#164193]">{name}</h2>
                                            <p className="text-gray-500">{degrees}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Specialities:</p>
                                            <p className="text-gray-500">{specialities.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Working in:</p>
                                            <p className="text-gray-500">{doctor?.hospitalDetails?.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Working Area:</p>
                                            <p className="text-gray-500">{doctor?.hospitalDetails?.area}</p>
                                        </div>
                                        <div className="hidden group-hover:block">
                                            <button
                                                onClick={() => handleModalOpen(doctor)}
                                                className="cursor-pointer px-8 py-2 bg-sky-50 outline-0 rounded-lg text-gray-500 font-bold hover:bg-sky-100 duration-300"
                                            >
                                                Book Appointment
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
