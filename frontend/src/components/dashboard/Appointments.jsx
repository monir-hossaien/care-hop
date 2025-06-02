import React, {useEffect, useState} from 'react';

import {DeleteAlert, errorToast,  successToast, TimestampToDate} from "../../helpers/helper.js";
import TableSkeleton from "../../skeleton/tableSkeleton.jsx";
import NotFound from "../NotFound.jsx";
import {appointmentStore} from "../../store/appointmentStore.js";
import LoadingModal from "../LoadingModal.jsx";
import {userStore} from "../../store/userStore.js";

const Appointments = ({appointmentList}) => {
    const [loading, setLoading] = useState(false);
    const {role, getRole, isLogin} = userStore();

    useEffect(()=>{
        (async ()=>{
            if(isLogin && !role){
                await getRole()
            }
        })()
    },[role])

    const {updateAppointmentStatus, fetchDoctorAppointmentList} = appointmentStore()

    const handleUpdateStatus = async (_id, newStatus) => {
        try {
            const data = {status: newStatus};
            setLoading(true);
            let result = await updateAppointmentStatus(_id, data)
            result.status === true &&
            setLoading(false);
            successToast(result?.message)
            await fetchDoctorAppointmentList()
        }catch(error){
            const msg =
                error?.response?.data?.message ||
                error?.message || "Something went wrong!";
            errorToast(msg);
            setLoading(false);
        }
    }

    // const handleSpecialtyDelete = async (_id) => {
    //     try {
    //         const isConfirmed = await DeleteAlert()
    //         if (isConfirmed) {
    //             let result = await deleteSpecialities(_id)
    //             if (result.status === true) {
    //                 successToast(result.message)
    //                 await fetchSpecialtiesList()
    //             } else {
    //                 errorToast(result.message)
    //             }
    //         }
    //     } catch (err) {
    //         const msg =
    //             err?.response?.data?.error ||
    //             err?.message ||
    //             "Something went wrong!";
    //         errorToast(msg);
    //     }
    // }

    return (
        <>
            {
                appointmentList === null ? (
                    <TableSkeleton/>
                ) : appointmentList.length === 0 ? (
                    <NotFound message="No Appointments available at the moment."/>
                ) : (
                    <>
                        <div className="py-5">
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm text-left text-gray-700">
                                        <thead className="bg-gray-100 text-xs text-gray-600 uppercase tracking-wider">
                                        <tr>
                                            {
                                                role === 'doctor' ? (
                                                    <th className="px-6 py-4">Patient</th>
                                                ) : (
                                                    <th className="px-6 py-4">Doctor</th>
                                                )
                                            }
                                            <th className="px-6 py-4">Day</th>
                                            <th className="px-6 py-4">Time slot</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {
                                            appointmentList?.map((appointment) => {
                                                    return (
                                                        <tr key={appointment?._id}
                                                            className="hover:bg-gray-50 transition-all">
                                                            {
                                                                role === 'doctor' ? (
                                                                    <td className="px-6 py-4 font-medium text-gray-800">{appointment?.patient?.name}</td>
                                                                ) : (
                                                                    <td className="px-6 py-4 font-medium text-gray-800">{appointment?.doctor?.name}</td>
                                                                )
                                                            }
                                                            <td className="px-6 py-4 text-gray-800 text-xs">{appointment?.day}</td>
                                                            <td className="px-6 py-4 text-gray-800 text-xs">{appointment?.timeSlot}</td>
                                                            {
                                                                role === 'doctor' ? (
                                                                    <td className="px-6 py-4">
                                                                        <select
                                                                            onChange={(e) => handleUpdateStatus(appointment._id, e.target.value)}
                                                                            className={`cursor-pointer text-sm border text-gray-700 border-gray-300 rounded px-3 py-1  focus:outline-none focus:ring-1 focus:ring-blue-200 transition
                                                                            ${appointment?.status === "Confirmed" ? "bg-green-100" : ""}
                                                                            ${appointment?.status === "Pending" ? "bg-yellow-100" : ""}
                                                                            ${appointment?.status === "Canceled" ? "bg-red-200" : ""}`}
                                                                        >
                                                                            <option
                                                                                value="">{appointment?.status}</option>
                                                                            {["Confirmed", "Canceled"].map((s, index) => (
                                                                                <option key={index} value={s}>
                                                                                    {s}
                                                                                </option>
                                                                            ))}
                                                                        </select>

                                                                    </td>
                                                                ) : (
                                                                    <td className={`${appointment?.status === 'Pending' ? 'text-yellow-800' : 'text-green-800'} px-6 py-4 text-gray-800 text-xs`}>{appointment?.status}</td>
                                                                )
                                                            }
                                                            <td className="px-6 py-4 text-gray-800 text-xs">{TimestampToDate(appointment?.createdAt)}</td>

                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center">
                                                                    <button
                                                                        // onClick={(e) => handleUpdateStatus(appointment._id, e.target.value)}
                                                                        className="cursor-pointer bg-red-50 py-1 rounded-md hover:underline px-4 text-red-600 hover:text-red-800 transition"
                                                                        title="Delete"
                                                                    >
                                                                        Remove
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
                    </>
                )
            }
            {
                loading && (
                    <LoadingModal />
                )

            }
        </>
    );
};

export default Appointments;
