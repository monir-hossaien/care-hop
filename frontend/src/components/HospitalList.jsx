import React from 'react';
import { hospitalStore } from "../store/hospitalStore.js";
import { useLocation } from "react-router-dom";
import { commonStore } from "../store/commmonStore.js";
import HospitalSkeleton from "../skeleton/hospitalSkeleton.jsx";
import NotFound from "./NotFound.jsx";

const HospitalList = () => {
    const { hospitalList } = hospitalStore();
    const { loading } = commonStore();
    const location = useLocation();

    const isSearchPage = location.pathname === "/search-hospital";
    const noHospitals = hospitalList?.length === 0;

    return (
        <div>
            <div className="grid grid-cols-12 gap-5 py-5">
                {
                    hospitalList === null ? (
                        isSearchPage ? (
                            loading ? <HospitalSkeleton/> :
                                null
                        ) : (
                            <HospitalSkeleton/>
                        )
                    ) : noHospitals ? (
                        <div className="col-span-12 text-center">
                            <NotFound message="No Hospital Found"/>
                        </div>
                    ) : (
                        hospitalList.map((hospital, index) => {
                            const {name, area, phone, image, rating } = hospital;
                            return (
                                <div
                                    key={index}
                                    className="col-span-12 sm:col-span-6 md:col-span-4 space-y-4 shadow-sm rounded py-8"
                                >
                                    <div className="w-full flex justify-center items-center">
                                        <img className="w-1/2 rounded" src={image} alt={name} />
                                    </div>
                                    <div className="space-y-3 px-5">
                                        <h1 className="text-xl font-extrabold text-[#1CA288]">{name}</h1>
                                        <div className="text-gray-600 text-sm">
                                            <p>{area}</p>
                                            <p>Phone: {phone}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )
                }
            </div>
        </div>
    );
};

export default HospitalList;
