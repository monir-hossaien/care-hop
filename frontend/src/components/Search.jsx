import React, { useState } from "react";
import { FaUserMd, FaHospital, FaPlus } from "react-icons/fa";
import { CiSquarePlus, CiLocationOn  } from "react-icons/ci";


const Search = () => {
    const [activeTab, setActiveTab] = useState("doctor");

    return (
        <div className="bg-gray-100 md:bg-[#EDF8FA] px-3 py-20 md:py-0">
            <div className="bg-white rounded-4xl  relative md:-top-13 shadow-lg">
                {/*doctor tab*/}
                <div
                    className="flex items-center gap-5 absolute -top-5 left-10 text-sm font-medium z-10">
                    {/* Doctor Tab */}
                    <button
                        className={`flex items-center gap-2 py-2 px-5 md:py-3 md:px-8 rounded-3xl transition-all duration-300 ${
                            activeTab === "doctor"
                                ? "bg-[#164193] text-white"
                                : "bg-[#EDF8FA] text-[#164193] hover:bg-[#164193] hover:text-white"
                        }`}
                        onClick={() => setActiveTab("doctor")}
                    >
                        <FaUserMd/>
                        Search Doctor
                    </button>

                    {/* Hospital Tab */}
                    <button
                        className={`flex items-center gap-2 py-2 px-5 md:py-3 md:px-8 rounded-3xl transition-all duration-300 ${
                            activeTab === "hospital"
                                ? "bg-[#164193] text-white"
                                : "bg-[#EDF8FA] text-[#164193] hover:bg-[#164193] hover:text-white"
                        }`}
                        onClick={() => setActiveTab("hospital")}
                    >
                        <FaHospital/>
                        Search Hospital
                    </button>
                </div>

                {/*search form*/}
                {
                    activeTab === "doctor" ? (
                        <div className="grid grid-cols-12 py-12 px-14 gap-6">
                            <div className="flex items-center gap-3 col-span-12 md:col-span-4">
                                <div className="p-3 rounded-full my-gradient text-white text-xl">
                                    <CiSquarePlus/>
                                </div>
                                <div className="w-full">
                                    <label className="font-bold text-lg block">Division</label>
                                    <select className="w-full border-b-1 border-b-gray-300 pb-1">
                                        <option>Select Division</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 col-span-12 md:col-span-4">
                                <div className="p-3 rounded-full my-gradient text-white text-xl">
                                    <CiLocationOn/>
                                </div>
                                <div className="w-full">
                                    <label className="font-bold text-lg block">District</label>
                                    <select className="w-full border-b-1 border-b-gray-300 pb-1">
                                        <option>Select District</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 col-span-12 md:col-span-4">
                                <div className="p-3 rounded-full my-gradient text-white text-xl">
                                    <CiLocationOn/>
                                </div>
                                <div className="w-full">
                                    <label className="font-bold text-lg block">Post</label>
                                    <select className="w-full border-b-1 border-b-gray-300 pb-1">
                                        <option>Select Post</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 col-span-12 md:col-span-4">
                                <div className="p-3 rounded-full my-gradient text-white text-xl">
                                    <CiLocationOn/>
                                </div>
                                <div className="w-full">
                                    <label className="font-bold text-lg block">Speciality</label>
                                    <select className="w-full border-b-1 border-b-gray-300 pb-1">
                                        <option>Select Speciality</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 col-span-12 md:col-span-4">
                                <div className="p-4 rounded-full my-gradient text-white">
                                    <FaUserMd/>
                                </div>
                                <div className="w-full">
                                    <label className="font-bold text-lg block">Doctor</label>
                                    <input
                                        className="w-full border-b-1 border-b-gray-300 pb-1 text-sm py-1 focus:outline-0 focus:shadow-sm"
                                        placeholder="Doctor Name"/>
                                </div>
                            </div>

                            <div className="col-span-12 md:col-span-4">
                                <div className="w-full">
                                    <button
                                        className="w-full bg-[#00B092] py-3 text-white font-medium rounded cursor-pointer">Search
                                    </button>
                                </div>
                            </div>


                        </div>
                    ) : <div className="grid grid-cols-10 py-12 px-14 gap-6">
                        <div className="flex items-center gap-3 col-span-12 md:col-span-2">
                            <div className="p-3 rounded-full my-gradient text-white text-xl">
                                <CiSquarePlus/>
                            </div>
                            <div className="w-full">
                                <label className="font-bold text-lg block">Division</label>
                                <select className="w-full border-b-1 border-b-gray-300 pb-1">
                                    <option>Select Division</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 col-span-12 md:col-span-2">
                            <div className="p-3 rounded-full my-gradient text-white text-xl">
                                <CiLocationOn/>
                            </div>
                            <div className="w-full">
                                <label className="font-bold text-lg block">District</label>
                                <select className="w-full border-b-1 border-b-gray-300 pb-1">
                                    <option>Select District</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 col-span-12 md:col-span-2">
                            <div className="p-3 rounded-full my-gradient text-white text-xl">
                                <CiLocationOn/>
                            </div>
                            <div className="w-full">
                                <label className="font-bold text-lg block">Post</label>
                                <select className="w-full border-b-1 border-b-gray-300 pb-1">
                                    <option>Select Post</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 col-span-12 md:col-span-2">
                            <div className="p-4 rounded-full my-gradient text-white">
                                <FaHospital/>
                            </div>
                            <div className="w-full">
                                <label className="font-bold text-lg block">Hospital</label>
                                <input
                                    className="w-full border-b-1 border-b-gray-300 pb-1 text-sm py-1 focus:outline-0 focus:shadow-sm"
                                    placeholder="Hospital Name"/>
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-2">
                            <div className="w-full">
                                <button
                                    className="w-full bg-[#00B092] py-3 text-white font-medium rounded cursor-pointer">Search
                                </button>
                            </div>
                        </div>


                    </div>
                }

                {/*hospital*/}

            </div>
        </div>
    );
};

export default Search;
