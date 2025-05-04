import React from 'react';
import {hospitalStore} from "../store/HospitalStore.js";

const HospitalList = () => {
    const {hospitalList} = hospitalStore();

    return (
        <div>
            <div className="grid grid-cols-12 gap-5 py-5">
                {
                    hospitalList === null ?(<p className="col-span-12 text-sm text-center">Loading...</p>):(
                        hospitalList?.map((hospital) => {
                            const {name, area, phone, image, rating} = hospital;
                            return (
                                <div
                                    className="col-span-12 sm:col-span-6 md:col-span-4 space-y-4 shadow-sm rounded py-8">
                                    <div className="w-full flex justify-center items-center">
                                        <img className="w-1/2 rounded" src={image}
                                             alt="image"/>
                                    </div>
                                    <div className="space-y-3 px-5">
                                        <h1 className="text-xl font-extrabold text-[#1CA288]">{name}</h1>
                                        <div className="text-gray-600 text-sm">
                                            <p>{area}</p>
                                            <p>Phone: {phone}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>
        </div>
    );
};

export default HospitalList;