import React, {useEffect} from 'react';

import {CiSearch} from "react-icons/ci";
import {RxDividerVertical} from "react-icons/rx";
import DoctorList from "./DoctorList.jsx";
import {useParams} from "react-router-dom";
import {commonStore} from "../store/commmonStore.js";
import {doctorStore} from "../store/doctorStore.js";

const SearchDoctorBySpecialty = () => {
    const { name } = useParams();
    const { searchParams, inputOnChange } = commonStore();
    const {fetchDoctorListByKeyword } = doctorStore();

    //Fetch doctors by name keyword when user types in search box
    useEffect(() => {
        (async () => {
            if (searchParams.name.trim() !== "") {
                await fetchDoctorListByKeyword(searchParams);
            }
        })();
    }, [searchParams, fetchDoctorListByKeyword]);

    return (
        <>
            <div className="min-h-screen bg-slate-100">
                <div className="container px-4 md:px-0">
                    {/* Header: Title & Search */}
                    <div className="grid grid-cols-12 gap-4 py-8 md:py-12">
                        {/* Keyword Title */}
                        <div className="col-span-12 md:col-span-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#00B092]">{name}</h2>
                        </div>

                        {/* Search Input */}
                        <div className="col-span-12 md:col-span-6 flex justify-start md:justify-end">
                            <div
                                className="w-full md:w-2/3 flex items-center border border-gray-300 rounded bg-white p-2">
                                <CiSearch className="text-xl text-gray-700"/>
                                <RxDividerVertical className="text-3xl text-gray-300 mx-1"/>
                                <input
                                    value={searchParams.name}
                                    type="text"
                                    placeholder="Search doctor by name"
                                    className="w-full text-sm text-gray-600 outline-none bg-transparent"
                                    onChange={(e) => inputOnChange("name", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Doctor List Component */}
                    <DoctorList/>
                </div>
            </div>
        </>
    );
};

export default SearchDoctorBySpecialty;