import React, {useEffect} from 'react';
import MasterLayout from "../layout/MasterLayout.jsx";
import DoctorList from "../components/DoctorList.jsx";
import {doctorStore} from "../store/doctorStore.js";
import {useParams} from "react-router-dom";
import {CiSearch} from "react-icons/ci";
import {RxDividerVertical} from "react-icons/rx";
import {commonStore} from "../store/commmonStore.js";

const SearchDoctorBySpecialityPage = () => {
    const {fetchDoctorListBySpeciality, fetchDoctorListByKeyword, resetSearchParams} = doctorStore();
    const {searchParams, inputOnChange,} = commonStore()
    const { keyword } = useParams();
    const {specialityID} = useParams();

    useEffect(()=>{
        (async ()=>{
            if (searchParams.name.trim() !== "") {
                await fetchDoctorListByKeyword(searchParams);
                // resetSearchParams()
            }
        })()
    },[searchParams, fetchDoctorListByKeyword])

    useEffect(() => {
        (async () => {
            await fetchDoctorListBySpeciality(specialityID);
        })()
    }, [specialityID, fetchDoctorListBySpeciality])



    return (
        <MasterLayout>
            <div className="min-h-screen bg-slate-100">
                <div className="container px-4 md:px-0">
                    <div className="grid grid-cols-12 gap-4 py-8 md:py-15">
                        <div className="col-span-12 md:col-span-6">
                            <h2 className="text-3xl font-bold text-[#00B092]">{keyword}</h2>
                        </div>

                        <div className="col-span-12 md:col-span-6 flex justify-end">
                            <div
                                className="w-full md:w-1/2 border border-gray-300 focus:shadow-sm rounded flex items-center p-2 bg-white">
                                <CiSearch className="text-xl text-gray-700"/>
                                <RxDividerVertical className="text-3xl text-gray-300"/>
                                <input
                                    value={searchParams.name}
                                    type="text"
                                    className="w-full text-sm text-gray-600 outline-none bg-transparent"
                                    placeholder="Doctor Name"
                                    onChange={(e) => inputOnChange("name", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <DoctorList/>
                </div>
            </div>
        </MasterLayout>
    );
};

export default SearchDoctorBySpecialityPage;