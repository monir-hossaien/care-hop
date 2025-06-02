import React, {useState} from 'react';

import {DeleteAlert, errorToast, successToast} from "../../helpers/helper.js";
import {CiEdit} from "react-icons/ci";
import {MdDelete} from "react-icons/md";
import {FaPlus} from "react-icons/fa";
import TableSkeleton from "../../skeleton/tableSkeleton.jsx";
import NotFound from "../NotFound.jsx";
import {Link} from "react-router-dom";
import AddHospitalModal from "../modal/AddHospitalModal.jsx";
import UpdateHospitalModal from "../modal/UpdateHospitalModal.jsx";
import {hospitalStore} from "../../store/hospitalStore.js";

const AllHospital = () => {

    const {hospitalList, deleteHospital, fetchAllHospitalList} = hospitalStore()
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedHospital, setSelectedHospital] = useState(null);


    const handleUpdateModalOpen = (hospital) => {
        setUpdateModalOpen(true);
        setSelectedHospital(hospital)
    }

    const handleDeleteHospital = async (_id) => {
        try {
            const isConfirmed = await DeleteAlert()
            if (isConfirmed) {
                let result = await deleteHospital(_id)
                if (result.status === true) {
                    successToast(result.message)
                    await fetchAllHospitalList()
                } else {
                    errorToast(result.message)
                }
            }
        } catch (err) {
            const msg =
                err?.response?.data?.error ||
                err?.message ||
                "Something went wrong!";
            errorToast(msg);
        }
    }

    return (
        <>
            <div className="flex justify-end">
                <button
                    onClick={() => setAddModalOpen(true)}
                    className="flex items-center gap-1 cursor-pointer px-5 py-2 bg-blue-100 text-blue-700 hover:text-white hover:bg-blue-500 transition-all duration-300 rounded-lg text-sm font-medium">
                    <FaPlus/>Add Hospital
                </button>
            </div>
            {
                hospitalList === null ? (
                    <TableSkeleton />
                ): hospitalList.length === 0 ? (
                    <NotFound message="No hospital available at the moment."/>
                ):(
                    <>
                        <div className="py-5">
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm text-left text-gray-700">
                                        <thead className="bg-gray-100 text-xs text-gray-600 uppercase tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4">Image</th>
                                            <th className="px-6 py-4">Name</th>
                                            <th className="px-6 py-4">Email</th>
                                            <th className="px-6 py-4">Phone</th>
                                            <th className="px-6 py-4">Division</th>
                                            <th className="px-6 py-4">District</th>
                                            <th className="px-6 py-4">Post</th>
                                            <th className="px-6 py-4">Area</th>
                                            <th className="px-6 py-4">Website</th>
                                            <th className="px-6 py-4">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {
                                            hospitalList.map((hospital, index) => {
                                                    const {_id, image, division, district, post, area, phone, email, website, name} = hospital;
                                                    return (
                                                        <tr key={index} className="hover:bg-gray-50 transition-all">
                                                            <td className="px-6 py-4">
                                                                <img
                                                                    src={image}
                                                                    alt="Blog thumbnail"
                                                                    className="w-16 h-12 rounded-md object-cover border shadow"
                                                                />
                                                            </td>
                                                            <td className="px-6 py-4 font-medium">{name}</td>
                                                            <td className="px-6 py-4">{email}</td>
                                                            <td className="px-6 py-4">{phone}</td>
                                                            <td className="px-6 py-4">{division}</td>
                                                            <td className="px-6 py-4">{district}</td>
                                                            <td className="px-6 py-4">{post}</td>
                                                            <td className="px-6 py-4 text-xs">{area}</td>
                                                            <td className="px-6 py-4 text-blue-600">
                                                                {website?.startsWith('http') || website?.startsWith('www.') ? (
                                                                    <Link
                                                                        to={website.startsWith('http') ? website : `https://${website}`}
                                                                        target="_blank"
                                                                        className="underline hover:text-blue-800 text-xs"
                                                                    >
                                                                        {website}
                                                                    </Link>
                                                                ) : (
                                                                    <span className="text-gray-800 text-xs uppercase">{website || 'N/A'}</span>
                                                                )}

                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center gap-3">
                                                                    <button
                                                                        onClick={() => handleUpdateModalOpen(hospital)}
                                                                        className="cursor-pointer text-blue-600 hover:text-blue-800 transition"
                                                                        title="Edit"
                                                                    >
                                                                        <CiEdit size={20}/>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteHospital(_id)}
                                                                        className="cursor-pointer text-red-600 hover:text-red-800 transition"
                                                                        title="Delete"
                                                                    >
                                                                        <MdDelete size={20}/>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {
                            addModalOpen ? (
                                <AddHospitalModal onClose={() => setAddModalOpen(false)}/>
                            ) : updateModalOpen &&
                                <UpdateHospitalModal
                                    hospital={selectedHospital}
                                    onClose={() => setUpdateModalOpen(false)}
                                />
                        }
                    </>
                )
            }
        </>
    );
};

export default AllHospital;
