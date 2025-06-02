import React, {useEffect} from 'react';
import {doctorStore} from "../../store/doctorStore.js";
import TableSkeleton from "../../skeleton/tableSkeleton.jsx";
import {DeleteAlert, errorToast, successToast, TimestampToDate} from "../../helpers/helper.js";
import {MdDelete} from "react-icons/md";
import NotFound from "../NotFound.jsx";

const AllDoctor = () => {
    const {doctorList, updateDoctorStatus, deleteDoctorByAdmin, fetchDoctorList} = doctorStore();


    const handleUpdateDoctorStatus = async (_id, newStatus) => {
        try {
            const result = await updateDoctorStatus(_id, {status: newStatus});
            if (result.status === true) {
                successToast(result.message);
                await fetchDoctorList();
            }
        } catch (err) {
            const msg = err?.response?.data?.message || err?.message || "Something went wrong!";
            errorToast(msg);
        }
    };

    const handleDeleteDoctor = async (userID) => {
        try {
            const isConfirmed = await DeleteAlert();
            if (isConfirmed) {
                const result = await deleteDoctorByAdmin(userID);
                if (result.status === true) {
                    successToast(result.message);
                    await fetchDoctorList(); // Re-fetch updated list
                }
            }
        } catch (error) {
            const msg = error?.response?.data?.message || error?.message || "Something went wrong!";
            errorToast(msg);
        }
    };

    if (doctorList == null) {
        return <TableSkeleton/>;
    } else if (doctorList.length === 0) {
        return <NotFound message="No doctors available at the moment."/>
    }

    return (
        <div className="py-5">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-700">
                        <thead className="bg-gray-100 text-xs text-gray-600 uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Licence</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Designation</th>
                            <th className="px-6 py-4">Experience</th>
                            <th className="px-6 py-4">Degree</th>
                            <th className="px-6 py-4">Gender</th>
                            <th className="px-6 py-4">Phone</th>
                            <th className="px-6 py-4">Days</th>
                            <th className="px-6 py-4">Slots</th>
                            <th className="px-6 py-4">Fees</th>
                            <th className="px-6 py-4">Hospital</th>
                            <th className="px-6 py-4">Specialization</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Action</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {doctorList.map((doctor) => {
                            const {
                                _id,
                                userID,
                                name,
                                registrationNo,
                                image,
                                designation,
                                gender,
                                phone,
                                experience,
                                degree,
                                availableSlot,
                                createdAt,
                                consultationFee,
                                hospitalDetails,
                                specialities,
                                user,
                                status,
                            } = doctor;

                            return (
                                <tr key={_id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <img
                                            src={image}
                                            alt="profile"
                                            className="w-16 h-12 rounded-md object-cover border shadow"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-medium">{name}</td>
                                    <td className="px-6 py-4 font-medium">{registrationNo}</td>
                                    <td className="px-6 py-4">{user?.email}</td>
                                    <td className="px-6 py-4">
                                            <span
                                                className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                                                {designation}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4">{experience} Years</td>
                                    <td className="px-6 py-4">{degree}</td>
                                    <td className="px-6 py-4">{gender}</td>
                                    <td className="px-6 py-4">{phone}</td>
                                    <td className="px-6 py-4 space-y-1">
                                        {availableSlot?.days?.map((day, i) => (
                                            <div key={i} className="text-xs text-gray-600">{day}</div>
                                        ))}
                                    </td>
                                    <td className="px-6 py-4 space-y-1">
                                        {availableSlot?.timeSlots?.map((slot, i) => (
                                            <div key={i} className="text-xs text-gray-600">{slot}</div>
                                        ))}
                                    </td>
                                    <td className="px-6 py-4">
                                            <span
                                                className="bg-red-100 text-red-700 text-xs font-medium px-2.5 py-1 rounded-full">
                                                {consultationFee}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4">{hospitalDetails?.name}</td>
                                    <td className="px-6 py-4">{specialities?.name}</td>
                                    <td className="px-6 py-4">
                                        <select
                                            onChange={(e) => handleUpdateDoctorStatus(userID, e.target.value)}
                                            className={`text-sm border border-gray-300 rounded px-3 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-200 transition
                                            ${status === "approved" ? "bg-green-100 text-green-700" : ""}
                                            ${status === "pending" ? "bg-yellow-100 text-yellow-800" : ""}
                                            ${status === "rejected" ? "bg-red-100 text-red-600" : ""}`}
                                        >
                                            <option value="">{status}</option>
                                            {["approved", "rejected", "pending"].map((s, index) => (
                                                <option key={index} value={s}>
                                                    {s}
                                                </option>
                                            ))}
                                        </select>

                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{TimestampToDate(createdAt)}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center">
                                            <button
                                                onClick={() => handleDeleteDoctor(userID)}
                                                className="cursor-pointer text-red-600 hover:text-red-800 transition"
                                                title="Delete"
                                            >
                                                <MdDelete size={20}/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllDoctor;
