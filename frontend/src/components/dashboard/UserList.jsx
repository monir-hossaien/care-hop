import React from "react";
import TableSkeleton from "../../skeleton/tableSkeleton.jsx";
import { DeleteAlert, errorToast, successToast, TimestampToDate } from "../../helpers/helper.js";
import { MdDelete } from "react-icons/md";
import NotFound from "../NotFound.jsx";
import { userStore } from "../../store/userStore.js";

const UserList = () => {
    const { userList, fetchUserList, deleteUserRequest } = userStore();

    const handleDeleteUser = async (userID) => {
        try {
            const isConfirmed = await DeleteAlert();
            if (isConfirmed) {
                const result = await deleteUserRequest(userID);
                if (result.status === true) {
                    successToast(result.message);
                    await fetchUserList();
                }
            }
        } catch (error) {
            const msg = error?.response?.data?.message || error?.message || "Something went wrong!";
            errorToast(msg);
        }
    };

    if (userList == null) return <TableSkeleton />;
    if (userList.length === 0) return <NotFound message="No User available at the moment." />;

    return (
        <div className="py-5">
            <div className="bg-white shadow-sm rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-600 tracking-wider">
                        <tr>
                            <th className="px-6 py-4 text-left">Image</th>
                            <th className="px-6 py-4 text-left">Name</th>
                            <th className="px-6 py-4 text-left">Email</th>
                            <th className="px-6 py-4 text-left">Role</th>
                            <th className="px-6 py-4 text-left">Gender</th>
                            <th className="px-6 py-4 text-left">Phone</th>
                            <th className="px-6 py-4 text-left">Address</th>
                            <th className="px-6 py-4 text-left">Date</th>
                            <th className="px-6 py-4 text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {userList.map((user) => {
                            const { _id, email, role, createdAt, profile } = user;
                            return (
                                <tr key={_id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <img
                                            src={profile?.image || "/images/default-avatar.png"}
                                            alt="profile"
                                            className="w-16 h-12 rounded-md object-cover border shadow"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-medium">{profile?.name || "N/A"}</td>
                                    <td className="px-6 py-4">{email}</td>
                                    <td className="px-6 py-4 capitalize">{role}</td>
                                    <td className="px-6 py-4">{profile?.gender || "N/A"}</td>
                                    <td className="px-6 py-4">{profile?.phone || "N/A"}</td>
                                    <td className="px-6 py-4">{profile?.address || "N/A"}</td>
                                    <td className="px-6 py-4 text-gray-500">{TimestampToDate(createdAt)}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => handleDeleteUser(_id)}
                                            className="cursor-pointer p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition duration-200"
                                            title="Delete"
                                        >
                                            <MdDelete size={18} />
                                        </button>
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

export default UserList;
