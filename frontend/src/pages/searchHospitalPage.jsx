import React, {useEffect, useState} from 'react';

import { CiLocationOn } from "react-icons/ci";
import { RxDividerVertical } from "react-icons/rx";
import {hospitalStore} from "../store/hospitalStore.js";
import {commonStore} from "../store/commmonStore.js";
import HospitalList from "../components/HospitalList.jsx";
import MasterLayout from "../layout/MasterLayout.jsx";


const SearchHospitalPage = () => {
    const {districtList, fetchDistrictList, divisionList, fetchDivisionList, postList, fetchPostList} = commonStore()
    const {searchParams, inputOnChange, setLoading} = commonStore()
    const {fetchHospitalListByKeyword}= hospitalStore()

    useEffect(() => {
        (async ()=>{
            await fetchDivisionList();
            if(Object.values(searchParams).some(value => value !== "" && value !== null)){
                setLoading(true)
                await fetchHospitalListByKeyword(searchParams)
                setLoading(false)
            }
        })()
    },[])

    const handleDistrictChange = async (e) => {
        const division_name = e.target.value;
        inputOnChange("division", division_name)
        await fetchDistrictList(division_name)
    }

    const handlePostChange = async (e) => {
        const district_name = e.target.value;
        inputOnChange("district", district_name)
        await fetchPostList(district_name)
    }

    const handleSearchHospital = async () => {
        if(Object.values(searchParams).some(value => value !== "" && value !== null)){
            setLoading(true)
            await fetchHospitalListByKeyword(searchParams)
            setLoading(false)
            // resetSearchParams()
        }
    }

    return (
        <MasterLayout>
            <div className="min-h-screen">
                <div className="bg-[#164193]">
                    <div className="container py-8 px-4 md:px-0">
                        <div className="grid grid-cols-12 gap-4 flex-wrap">
                            {/* Division */}
                            <div className="col-span-12 sm:col-span-6 md:col-span-2">
                                <div className="bg-white rounded-lg px-3 py-4 flex items-center gap-2 shadow-sm w-full">
                                    <CiLocationOn className="text-[#164193] text-xl"/>
                                    <RxDividerVertical className="text-gray-300 text-xl"/>
                                    <select
                                        className="w-full text-sm text-gray-700 outline-none bg-transparent"
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

                            {/* District */}
                            <div className="col-span-12 sm:col-span-6 md:col-span-2">
                                <div className="bg-white rounded-lg px-3 py-4 flex items-center gap-2 shadow-sm w-full">
                                    <CiLocationOn className="text-[#164193] text-xl"/>
                                    <RxDividerVertical className="text-gray-300 text-xl"/>
                                    <select
                                        className="w-full text-sm text-gray-700 outline-none bg-transparent"
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

                            {/* Post */}
                            <div className="col-span-12 sm:col-span-6 md:col-span-2">
                                <div className="bg-white rounded-lg px-3 py-4 flex items-center gap-2 shadow-sm w-full">
                                    <CiLocationOn className="text-[#164193] text-xl"/>
                                    <RxDividerVertical className="text-gray-300 text-xl"/>
                                    <select
                                        className="w-full text-sm text-gray-700 outline-none bg-transparent"
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

                            {/* Area*/}
                            <div className="col-span-12 sm:col-span-6 md:col-span-2">
                                <div className="bg-white rounded-lg px-3 py-4 flex items-center gap-2 shadow-sm w-full">
                                    <CiLocationOn className="text-[#164193] text-xl"/>
                                    <RxDividerVertical className="text-gray-300 text-xl"/>
                                    <input
                                        type="text"
                                        className="w-full text-sm text-gray-700 outline-none bg-transparent"
                                        placeholder="Select Area"
                                        value={searchParams.area}
                                        onChange={(e) => inputOnChange("area", e.target.value)}
                                    />
                                </div>
                            </div>


                            {/* Doctor Name */}
                            <div className="col-span-12 sm:col-span-6 md:col-span-3">
                                <div className="bg-white rounded-lg px-3 py-4 flex items-center gap-2 shadow-sm w-full">
                                    <CiLocationOn className="text-[#164193] text-xl"/>
                                    <RxDividerVertical className="text-gray-300 text-xl"/>
                                    <input
                                        type="text"
                                        className="w-full text-sm text-gray-700 outline-none bg-transparent"
                                        placeholder="Hospital Name"
                                        value={searchParams.name}
                                        onChange={(e) => inputOnChange("name", e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* SearchTab Button */}
                            <div className="col-span-12 sm:col-span-6 md:col-span-1 flex items-center">
                                <button
                                    onClick={handleSearchHospital}
                                    className="w-full sm:w-full md:w-full px-10 md:px-6 py-4 rounded-lg bg-[#00B092] text-white text-sm cursor-pointer"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container px-4 sm:px-4 md:px-0">
                    <h2 className="text-2xl font-bold text-[#00B092] md:px-0 py-5">Search Result</h2>
                    <HospitalList/>
                </div>
            </div>
        </MasterLayout>
    );

};

export default SearchHospitalPage;
