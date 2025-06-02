import React from 'react';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ImagePlaceholder from "../assets/image.json";
import Lottie from "lottie-react";

const TableSkeleton = () => {
    return (
        <div className="overflow-x-auto w-full py-5">
            <table className="min-w-full divide-y divide-gray-200">
                <tbody>
                {Array.from({ length: 8 }).map((_, i) => (
                    <tr key={i} className="bg-white even:bg-gray-50">
                        <td className="px-6 py-4">
                            <Lottie className="w-10 h-10" animationData={ImagePlaceholder} loop />
                        </td>
                        <td className="px-6 py-4">
                            <Skeleton width={120} height={15} />
                        </td>
                        <td className="px-6 py-4">
                            <Skeleton width={80} height={10} />
                        </td>
                        <td className="px-6 py-4">
                            <Skeleton width={100} height={15} />
                        </td>
                        <td className="px-6 py-4">
                            <Skeleton width={50} height={15} />
                        </td>
                        <td className="px-6 py-4">
                            <Skeleton width={60} height={10} />
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex gap-3">
                                <Skeleton  height={20} width={20} />
                                <Skeleton  height={20} width={20} />
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableSkeleton;
