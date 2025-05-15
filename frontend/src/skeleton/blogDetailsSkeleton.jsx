import React from 'react';
import Skeleton from 'react-loading-skeleton';
import SidebarSkeleton from "./sidebarSkeleton.jsx";

const BlogDetailsSkeleton = () => {
    return (
        <div className="container px-4 sm:px-6 md:px-0 py-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Main Blog Skeleton */}
                <div className="md:col-span-8">
                    <Skeleton height={300} className="w-full rounded-lg"/>
                    <div className="mt-3">
                        <Skeleton width={"15%"} height={10}/>
                    </div>
                    <div className="flex flex-col gap-4 py-5">
                        <Skeleton width={"20%"} height={20}/>
                        <Skeleton count={6} height={15}/>
                    </div>
                </div>

                {/* Sidebar Skeleton */}
                <SidebarSkeleton/>
            </div>
        </div>
    );
};

export default BlogDetailsSkeleton;
