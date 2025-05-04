import React, {useEffect, useState} from "react";

import { FaUserMd, FaHospital} from "react-icons/fa";
import { CiSquarePlus, CiLocationOn  } from "react-icons/ci";
import {specialitiesStore} from "../store/specialitiesStore.js";
import {useNavigate} from "react-router-dom";
import {commonStore} from "../store/commmonStore.js";

const SearchTab = () => {
    const [activeTab, setActiveTab] = useState("doctor");
    const {divisionList, fetchDivisionList, districtList, fetchDistrictList, postList, fetchPostList} = commonStore();
    const {specialities, fetchSpecialityList} = specialitiesStore();
    const {searchParams, inputOnChange} = commonStore()
    const navigate = useNavigate();


    useEffect(() => {
        (async ()=>{
            await fetchDivisionList();
            await fetchSpecialityList();
        })()
    },[])

    const handleDistrictChange = async (e) => {
        const division = e.target.value;
        await fetchDistrictList(division);
        inputOnChange("division", division);
    }

    const handlePostChange = async (e) => {
        const district = e.target.value;
        await fetchPostList(district);
        inputOnChange("district", district);
    }

    const handleSearchDoctor = async () => {
        navigate(`/search-doctor`)
    }

    const handleSearchHospital = async () => {
        navigate(`/search-hospital`)
    }

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
                                    <select
                                        className="w-full text-sm text-gray-700 border border-gray-200 px-3 py-2 rounded bg-transparent"
                                        value={searchParams.division}
                                        onChange={handleDistrictChange}
                                    >
                                        <option value="">Select Division</option>
                                        {divisionList?.map(({_id, name}) => (
                                            <option value={name} key={_id}>{name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 col-span-12 md:col-span-4">
                                <div className="p-3 rounded-full my-gradient text-white text-xl">
                                    <CiLocationOn/>
                                </div>
                                <div className="w-full">
                                    <label className="font-bold text-lg block">District</label>
                                    <select
                                        className="w-full text-sm text-gray-700 border border-gray-200 px-3 py-2 rounded  bg-transparent"
                                        value={searchParams.district}
                                        onChange={handlePostChange}
                                    >
                                        <option value="">Select District</option>
                                        {districtList?.map(({_id, name}) => (
                                            <option value={name} key={_id}>{name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 col-span-12 md:col-span-4">
                                <div className="p-3 rounded-full my-gradient text-white text-xl">
                                    <CiLocationOn/>
                                </div>
                                <div className="w-full">
                                    <label className="font-bold text-lg block">Post</label>
                                    <select
                                        className="w-full text-sm text-gray-700 border border-gray-200 px-3 py-2 rounded  bg-transparent"
                                        value={searchParams.post}
                                        onChange={(e) => inputOnChange("post", e.target.value)}
                                    >
                                        <option value="">Select Post</option>
                                        {postList?.map(({_id, name}) => (
                                            <option value={name} key={_id}>{name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 col-span-12 md:col-span-4">
                                <div className="p-3 rounded-full my-gradient text-white text-xl">
                                    <CiLocationOn/>
                                </div>
                                <div className="w-full">
                                    <label className="font-bold text-lg block">Speciality</label>
                                    <select
                                        className="w-full text-sm text-gray-700 border border-gray-200 px-3 py-2 rounded  bg-transparent"
                                        value={searchParams.specialityID}
                                        onChange={(e) => inputOnChange("specialityID", e.target.value)}
                                    >
                                        <option value="">Select Speciality</option>
                                        {specialities?.data?.map(({_id, name}) => (
                                            <option value={_id} key={_id}>{name}</option>
                                        ))}
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
                                        value={searchParams.name}
                                        onChange={(e) => {
                                            inputOnChange("name", e.target.value)}}
                                        className="w-full border-b-1 border-b-gray-300 pb-1 text-sm py-1 focus:outline-0 focus:shadow-sm"
                                        placeholder="Doctor Name"/>
                                </div>
                            </div>

                            <div className="col-span-12 md:col-span-4">
                                <div className="w-full">
                                    <button onClick={handleSearchDoctor}
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
                                <select
                                    className="w-full text-sm text-gray-700 border border-gray-200 px-3 py-2 rounded  bg-transparent"
                                    value={searchParams.division}
                                    onChange={handleDistrictChange}
                                >
                                    <option value="">Select Division</option>
                                    {divisionList?.map(({_id, name}) => (
                                        <option value={name} key={_id}>{name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 col-span-12 md:col-span-2">
                            <div className="p-3 rounded-full my-gradient text-white text-xl">
                                <CiLocationOn/>
                            </div>
                            <div className="w-full">
                                <label className="font-bold text-lg block">District</label>
                                <select
                                    className="w-full text-sm text-gray-700 border border-gray-200 px-3 py-2 rounded  bg-transparent"
                                    value={searchParams.district}
                                    onChange={handlePostChange}
                                >
                                    <option value="">Select District</option>
                                    {districtList?.map(({_id, name}) => (
                                        <option value={name} key={_id}>{name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 col-span-12 md:col-span-2">
                            <div className="p-3 rounded-full my-gradient text-white text-xl">
                                <CiLocationOn/>
                            </div>
                            <div className="w-full">
                                <label className="font-bold text-lg block">Post</label>
                                <select
                                    className="w-full text-sm text-gray-700 border border-gray-200 px-3 py-2 rounded  bg-transparent"
                                    value={searchParams.post}
                                    onChange={(e) => inputOnChange("post", e.target.value)}
                                >
                                    <option value="">Select Post</option>
                                    {postList?.map(({_id, name}) => (
                                        <option value={name} key={_id}>{name}</option>
                                    ))}
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
                                    value={searchParams.name}
                                    onChange={(e) => {
                                        inputOnChange("name", e.target.value)
                                    }}
                                    className="w-full border border-gray-200 px-3 text-sm  py-1 rounded  focus:outline-0 focus:shadow-sm"
                                    placeholder="Hospital Name"/>
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-2">
                            <div className="w-full">
                            <button onClick={handleSearchHospital}
                                    className="w-full bg-[#00B092] py-3  text-white font-medium rounded cursor-pointer">Search
                                </button>
                            </div>
                        </div>


                    </div>
                }

            </div>
        </div>
    );
};

export default SearchTab;
