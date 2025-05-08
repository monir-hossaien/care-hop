import React from 'react';
import Skeleton from "react-loading-skeleton";

const SidebarSkeleton = () => {
    return (
        <>
            <div className="md:col-span-4">
                <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6 space-y-5">
                    <Skeleton width={160} height={25}/>
                    <Skeleton width={64} height={6}/>

                    {Array.from({length: 3}).map((_, i) => (
                        <div key={i} className="mb-6 space-y-2">
                            <Skeleton height={120} className="w-full rounded"/>
                            <Skeleton width="50%" height={16}/>
                            <Skeleton width="80%" height={20}/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SidebarSkeleton;