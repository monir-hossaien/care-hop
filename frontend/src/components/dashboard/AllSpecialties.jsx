import React, {useEffect, useState} from 'react';

import {DeleteAlert, errorToast, successToast} from "../../helpers/helper.js";
import {CiEdit} from "react-icons/ci";
import {MdDelete} from "react-icons/md";
import {FaPlus} from "react-icons/fa";
import TableSkeleton from "../../skeleton/tableSkeleton.jsx";
import NotFound from "../NotFound.jsx";
import {specialitiesStore} from "../../store/specialitiesStore.js";
import AddSpecialtyModal from "../modal/AddSpecialtyModal.jsx";
import UpdateSpecialtyModal from "../modal/UpdateSpecialtyModal.jsx";

const AllSpecialties = () => {
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const {specialities, fetchSpecialtiesList, deleteSpecialities} = specialitiesStore();


    const handleUpdateModalOpen = (specialty) => {
        setUpdateModal(true);
        setSelectedSpecialty(specialty)
    }

    const handleSpecialtyDelete = async (_id) => {
        try {
            const isConfirmed = await DeleteAlert()
            if (isConfirmed) {
                let result = await deleteSpecialities(_id)
                if (result.status === true) {
                    successToast(result.message)
                    await fetchSpecialtiesList()
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
                    onClick={() => setAddModal(true)}
                    className="flex items-center gap-1 cursor-pointer px-5 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                    <FaPlus/>Add Specialty
                </button>
            </div>
            {
                specialities === null ? (
                    <TableSkeleton />
                ): specialities.length === 0 ? (
                    <NotFound message="No specialties available at the moment."/>
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
                                            <th className="px-6 py-4">Description</th>
                                            <th className="px-6 py-4">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {
                                            specialities?.data?.map((specialty, index) => {
                                                    const {_id, image, name, description} = specialty;

                                                    return (
                                                        <tr key={index} className="hover:bg-gray-50 transition-all">
                                                            <td className="px-6 py-4">
                                                                <img
                                                                    src={image}
                                                                    alt="thumbnail"
                                                                    className="w-16 h-12 rounded-md object-cover border shadow"
                                                                />
                                                            </td>
                                                            <td className="px-6 py-4 font-medium text-gray-800">{name}</td>
                                                            <td className="px-6 py-4 text-gray-800 text-xs">{description}</td>
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center gap-3">
                                                                    <button
                                                                        onClick={() => handleUpdateModalOpen(specialty)}
                                                                        className="cursor-pointer text-blue-600 hover:text-blue-800 transition"
                                                                        title="Edit"
                                                                    >
                                                                        <CiEdit size={20}/>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleSpecialtyDelete(_id)}
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
                            addModal ? (
                                <AddSpecialtyModal onClose={() => setAddModal(false)}/>
                            ) : updateModal &&
                                <UpdateSpecialtyModal
                                    specialty={selectedSpecialty}
                                    onClose={() => setUpdateModal(false)}
                                />
                        }
                    </>
                )
            }
        </>
    );
};

export default AllSpecialties;
