import React from 'react';
import {useLocation} from "react-router-dom";

const Speciality = () => {
    const location = useLocation();

    return (
        <>
            {
                location.pathname === "/doctor" ? (
                    <div className="text-center py-32 bg-[url(/images/hero_bg.jpg)] bg-center bg-cover bg-no-repeat">
                        <h1 className="text-4xl text-[#357B7A] font-medium opacity-100">Doctor Specialties</h1>
                    </div>
                ):(
                    <div className="text-center mt-10">
                        <h1 className="text-4xl text-[#164193] font-bold">View Doctors by Specialities</h1>
                        <p className="uppercase py-3 font-bold text-[#00B092] tracking-widest">Specialities</p>
                    </div>
                )
            }
            {/* Grid Section */}
            <div className="container">
                <div className="grid grid-cols-12 gap-6 py-14">
                    {
                        Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="col-span-12 md:col-span-3">
                                <div className="shadow-lg rounded-lg text-gray-600 px-4 py-10 flex flex-col items-center space-y-3 hover:bg-[#164193] hover:text-white transition-all duration-300 hover:scale-105">
                                    <img className="w-28 bg-white rounded-full p-4" src="/images/Medicine.png" alt="Medicine" />
                                    <h3 className="text-xl font-bold text-[#1BA288] group-hover:text-white transition-all duration-300">Medicine</h3>
                                    <p className="text-center text-sm">
                                        A Thoracic Surgeon specializes in surgical treatments of the chest, including the lungs, esophagus, heart, and major blood vessels.
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default Speciality;
