import React from 'react';
import Skeleton from "react-loading-skeleton";
import Lottie from "lottie-react";
import ImagePlaceholder from "../assets/image.json";

const HospitalSkeleton = () => {
    return (
        <>
            {
                Array.from({length: 8}).map((_, i) => (
                    <div key={i} className="col-span-12 md:col-span-4">
                        <div className="shadow-sm">
                            <Lottie className="w-60 mx-auto" animationData={ImagePlaceholder} loop={true}/>
                            <div className="p-4 space-y-3">
                                <Skeleton height={10}/>
                                <Skeleton height={10} width="80%"/>
                                <Skeleton height={10} width="60%"/>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export default HospitalSkeleton;