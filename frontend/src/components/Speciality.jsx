import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {specialitiesStore} from "../store/specialitiesStore.js";
import SpecialitySkeleton from "../skeleton/specialitySkeleton.jsx";
import Banner from "./Banner.jsx";
import { motion } from 'framer-motion';


const Speciality = () => {
    const location = useLocation();
    // const [currentPage, setCurrentPage] = useState(1);
    const {specialities, fetchSpecialtiesList} = specialitiesStore();

    useEffect(() => {

        (async () => {
            await fetchSpecialtiesList();
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
                    <Banner name={"Doctor Specialties"}/>
                ) : (
                    <div className="text-center mt-10">
                        <motion.h1
                            initial={{opacity: 0, x: -100}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{
                                duration: 0.8,
                            }}
                            className="text-4xl md:text-5xl text-[#164193] font-bold text-center"
                        >
                            View Doctors by Specialities
                        </motion.h1>

                        <motion.p
                            initial={{opacity: 0, x: 100}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{
                                duration: 0.6,
                            }}
                            className="uppercase py-3 font-bold text-[#00B092] tracking-widest text-center"
                        >
                            Specialities
                        </motion.p>

                    </div>
                )
            }
            {/* Grid Section */}
            <div className="container">
                {
                    specialities === null ? (<SpecialitySkeleton/>) : (
                        <div className="grid grid-cols-12 gap-5 py-14 px-4 md:px-0">
                        {
                                specialities.data.map((speciality, index) => {
                                    const {_id, name, description, image} = speciality;
                                    return (
                                        <motion.div
                                            initial={{opacity: 0, y: 100, scale: 0.95}}
                                            whileInView={{opacity: 1, y: 0, scale: 1}}
                                            transition={{duration: 0.6, ease: "easeOut"}}
                                            className="col-span-12 md:col-span-3" key={_id}>
                                            <Link to={`/department/${name}/${_id}`}>
                                                <div
                                                    className="shadow-sm rounded-lg text-gray-600 px-4 py-8 flex flex-col items-center  space-y-4 hover:bg-[#164193] hover:text-white transition-all duration-300 hover:scale-102">
                                                    <img className="w-28 bg-white rounded-full p-4" src={image}
                                                         alt="image"/>
                                                    <h3 className="text-start text-lg font-extrabold text-[#1BA288] group-hover:text-white transition-all duration-300">{name}</h3>
                                                    <p className="text-sm">{description}</p>
                                                </div>
                                            </Link>
                                        </motion.div>
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
