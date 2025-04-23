import React from 'react';
import Skeleton from "react-loading-skeleton";
import Lottie from "lottie-react";
import ImagePlaceholder from '../assets/image.json'

const PostSkeleton = () => {
    return (
        <div>
            <div className="container">
                <div className="grid grid-cols-12 gap-6 py-14 px-4 md:px-0">
                    {
                        Array.from({length: 8}).map((_, i) => (
                            <div key={i} className="col-span-12 md:col-span-4">
                                <div className="shadow-sm">
                                    <Lottie className="w-100" animationData={ImagePlaceholder} loop={true}/>
                                    <div className="space-y-4 py-7">
                                        <Skeleton count={3} width={"100"}/>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default PostSkeleton;