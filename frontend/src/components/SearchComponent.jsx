import React from 'react';
import { CiLocationOn } from "react-icons/ci";
import { RxDividerVertical } from "react-icons/rx";

const SearchComponent = () => {
    return (
        <div className="h-screen">
            <div className="bg-[#164193]">
                <div className="container py-8 px-4 md:px-0">
                    <div className="grid grid-cols-12 gap-5 md:gap-2">
                        <div className="col-span-12 md:col-span-2">
                            <div className="bg-white rounded-lg px-3 py-4 flex items-center gap-2 shadow-sm w-full">
                                <CiLocationOn className="text-[#164193] text-xl"/>
                                <RxDividerVertical className="text-gray-300 text-xl"/>
                                <select className="w-full text-sm text-gray-700 outline-none bg-transparent">
                                    <option value="" className="px-20">Select Division</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-2">
                            <div className="bg-white rounded-lg px-3 py-4 flex items-center gap-2 shadow-sm w-full">
                                <CiLocationOn className="text-[#164193] text-xl"/>
                                <RxDividerVertical className="text-gray-300 text-xl"/>
                                <select className="w-full text-sm text-gray-700 outline-none bg-transparent">
                                    <option value="" className="px-20">Select District</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-2">
                            <div className="bg-white rounded-lg px-3 py-4 flex items-center gap-2 shadow-sm w-full">
                                <CiLocationOn className="text-[#164193] text-xl"/>
                                <RxDividerVertical className="text-gray-300 text-xl"/>
                                <select className="w-full text-sm text-gray-700 outline-none bg-transparent">
                                    <option value="" className="px-20">Select Post</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-3">
                            <div className="bg-white rounded-lg px-3 py-4 flex items-center gap-2 shadow-sm w-full">
                                <CiLocationOn className="text-[#164193] text-xl"/>
                                <RxDividerVertical className="text-gray-300 text-xl"/>
                                <select className="w-full text-sm text-gray-700 outline-none bg-transparent">
                                    <option value="" className="px-20">Select Speciality</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-2">
                            <div className="bg-white rounded-lg px-3 py-4 flex items-center gap-2 shadow-sm w-full">
                                <CiLocationOn className="text-[#164193] text-xl"/>
                                <RxDividerVertical className="text-gray-300 text-xl"/>
                                <input type="text" className="w-full text-sm text-gray-700 outline-none bg-transparent"
                                       placeholder="Doctor Name"/>
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-1">
                            <button
                                className="px-10 md:px-6 py-4 rounded-lg bg-[#00B092] outline-0 text-white cursor-pointer text-sm">Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h2 className="text-2xl font-bold text-[#00B092] px-4 md:px-0 py-5">Search Result</h2>
                <p className="text-sm text-gray-500 text-center py-5">Search to get specialist doctor information !!</p>
            </div>
        </div>
    );
};

export default SearchComponent;
