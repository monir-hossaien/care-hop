import React from 'react';
import Skeleton from "react-loading-skeleton";
import Lottie from "lottie-react";
import ImagePlaceholder from '../assets/image.json'

const SpecialitySkeleton = () => {
    return (
        <div>
            <div className="grid grid-cols-12 gap-6 py-14 px-4 md:px-0">
                {
                    Array.from({length: 8}).map((_, i) => (
                        <div key={i} className="col-span-12 md:col-span-3">
                            <div
                                className="shadow-lg rounded-lg px-4 py-5 flex flex-col items-center">
                                <Lottie className="w-1/2" animationData={ImagePlaceholder} loop={true}/>
                                <div>
                                    <Skeleton count={3} width={"100"}/>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default SpecialitySkeleton;