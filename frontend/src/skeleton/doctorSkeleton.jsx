import React from 'react';
import Lottie from "lottie-react";
import ImagePlaceholder from "../assets/image.json";
import Skeleton from "react-loading-skeleton";

const DoctorSkeleton = () => {
    return (
        <>
            {
                Array.from({length: 8}).map((_, i) => (
                    <div className="col-span-12 md:col-span-6" key={i}>
                        <div
                            className="bg-white border border-gray-300 shadow-sm rounded w-full flex flex-col sm:flex-row items-center sm:items-start px-5 py-8 gap-6">
                            <div
                                className="w-44 h-44 flex justify-center items-center rounded-full bg-[#EFEFEF] shrink-0">
                                <Lottie className="w-60 mx-auto" animationData={ImagePlaceholder} loop={true}/>
                            </div>
                            <div className="space-y-2 md:space-y-3 text-sm w-full">
                                <div>
                                    <h2 className="text-xl font-bold text-[#164193]">
                                        <Skeleton width={'60%'} height={24}/>
                                    </h2>
                                    <p className="text-gray-500">
                                        <Skeleton width={'40%'} height={16}/>
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Specialities:</p>
                                    <p className="text-gray-500">
                                        <Skeleton width={'50%'} height={16}/>
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Working in:</p>
                                    <p className="text-gray-500">
                                        <Skeleton width={'70%'} height={16}/>
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Working Area:</p>
                                    <p className="text-gray-500">
                                        <Skeleton width={'50%'} height={16}/>
                                    </p>
                                </div>
                                <div>
                                    <Skeleton height={36} width={160} borderRadius={8}/>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export default DoctorSkeleton;