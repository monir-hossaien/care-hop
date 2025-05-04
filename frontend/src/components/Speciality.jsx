import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {specialitiesStore} from "../store/specialitiesStore.js";
import SpecialitySkeleton from "../skeleton/specialitySkeleton.jsx";

const Speciality = () => {
    const location = useLocation();
    // const [currentPage, setCurrentPage] = useState(1);
    const {specialities, fetchSpecialityList} = specialitiesStore();

    useEffect(() => {

        (async () => {
            await fetchSpecialityList();
        })()

    }, [])

    // const handlePageChange = (pageNum) => {
    //     setCurrentPage(pageNum);
    //     window.scrollTo(0, 300);  // Scroll to top when page changes
    // };


    return (
        <>
            {
                location.pathname === "/specialities" ? (
                    <div className="text-center py-32 bg-[url(/images/hero_bg.jpg)] bg-center bg-cover bg-no-repeat">
                        <h1 className="text-4xl text-[#357B7A] font-medium opacity-100">Doctor Specialties</h1>
                    </div>
                ) : (
                    <div className="text-center mt-10">
                        <h1 className="text-4xl text-[#164193] font-bold">View Doctors by Specialities</h1>
                        <p className="uppercase py-3 font-bold text-[#00B092] tracking-widest">Specialities</p>
                    </div>
                )
            }
            {/* Grid Section */}
            <div className="container">
                {
                    specialities === null ? (<SpecialitySkeleton/>) : (
                        <div className="grid grid-cols-12 gap-5 py-14 px-4 md:px-0">
                            {
                                specialities.data.map((speciality) => {
                                    const {_id, name, description, image} = speciality;
                                    return (
                                        <div className="col-span-12 md:col-span-3" key={_id}>
                                            <Link to={`/department/${name}/${_id}`}>
                                                <div
                                                    className="shadow-lg rounded-lg text-gray-600 px-4 py-8 flex flex-col items-center space-y-4 hover:bg-[#164193] hover:text-white transition-all duration-300 hover:scale-102">
                                                    <img className="w-28 bg-white rounded-full p-4" src={image}
                                                         alt="image"/>
                                                    <h3 className="text-lg font-extrabold text-[#1BA288] group-hover:text-white transition-all duration-300">{name}</h3>
                                                    <p className="text-sm">{description}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }

                {/*{*/}
                {/*    specialities !== null && (*/}
                {/*        location.pathname === "/" ? (*/}
                {/*            <div className="text-center pb-18">*/}
                {/*                <Link to={"/specialities"} className="px-8 py-3 bg-[#00B092] text-white rounded-md cursor-pointer">View All*/}
                {/*                </Link>*/}
                {/*            </div>*/}
                {/*        ) : (*/}
                {/*            <div*/}
                {/*                className="text-sm flex flex-col items-center py-8 mx-auto space-y-6 sm:flex-row sm:justify-between sm:space-y-0 ">*/}
                {/*                <div className="text-gray-500 dark:text-gray-400">*/}
                {/*                    <span*/}
                {/*                        className="font-medium text-gray-700 dark:text-gray-100">{specialities.pagination.currentPage} - {specialities.pagination.limit} </span>*/}
                {/*                    of {specialities.pagination.totalItems} Records*/}
                {/*                </div>*/}

                {/*                <div className="-mx-2">*/}
                {/*                    {[...Array(specialities.pagination.totalPages)].map((_, index) => {*/}
                {/*                        const pageNum = index + 1;*/}
                {/*                        return (*/}
                {/*                            <button*/}
                {/*                                key={pageNum}*/}
                {/*                                onClick={() => handlePageChange(pageNum)}*/}
                {/*                                className={`inline-flex items-center justify-center px-4 py-2 mx-2 rounded-lg transition-colors duration-300 ${*/}
                {/*                                    currentPage === pageNum*/}
                {/*                                        ? "bg-gray-300 text-white"*/}
                {/*                                        : "text-gray-700 hover:bg-gray-100"*/}
                {/*                                }`}*/}
                {/*                            >*/}
                {/*                                {pageNum}*/}
                {/*                            </button>*/}
                {/*                        );*/}
                {/*                    })}*/}
                {/*                </div>*/}

                {/*            </div>*/}
                {/*        )*/}
                {/*    )*/}
                {/*}*/}
            </div>
        </>
    );
};

export default Speciality;
