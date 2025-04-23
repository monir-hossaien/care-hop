import React from 'react';
import {CiSearch} from "react-icons/ci";
import {RxDividerVertical} from "react-icons/rx";

const DoctorList = () => {
    return (
        <div className="h-screen bg-slate-100">
            <div className="container">
                <div className="grid grid-cols-12 px-4 py-10 md:py-18 md:px-0">
                    <div className="col-span-12 md:col-span-6">
                        <h2 className="text-3xl font-bold text-[#00B092]">Cardiologist</h2>
                    </div>

                    <div className="col-span-12 md:col-span-6">
                        <div className="grid grid-cols-12 gap-3">
                            <div className="col-span-12 md:col-span-8">
                                <div className="border border-gray-300 focus:shadow-sm rounded w-full flex items-center p-2">
                                    <CiSearch className="text-xl text-gray-700" />
                                    <RxDividerVertical className="text-3xl text-gray-300" />
                                    <input type="text" className="w-full text-sm text-gray-600 outline-none bg-transparent" placeholder="Doctor Name"/>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-4">
                                <button className="px-8 py-3 bg-[#00B092] w-full text-white rounded-md cursor-pointer">Search</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 py-18">
                        <div className="border border-gray-300 focus:shadow-sm rounded w-full flex items-center p-2">
                            <div className="w-44 h-44 flex justify-center items-center rounded-full bg-slate-200">
                                <img src="/images/doctor_1.png" className="w-44 h-44 rounded-full" alt="image"/>
                            </div>
                            <div>
                                <h2>DR MOSADDEQUL ALOM</h2>
                                <div className="space-y-3">
                                    <p>MD ( cardiology), MBBS</p>
                                    <div>
                                        <p>Specialities:</p>
                                        <p>Cardiologist</p>
                                    </div>
                                    <div>
                                        <p>Working in:</p>
                                        <p>Modern Diagnostic Center</p>
                                    </div>
                                    <div>
                                        <p>Working Area:</p>
                                        <p>Dhaka,</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorList;