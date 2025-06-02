import React from "react";
import TableSkeleton from "../../skeleton/tableSkeleton.jsx";
import { DeleteAlert, errorToast, successToast, TimestampToDate } from "../../helpers/helper.js";
import { MdDelete } from "react-icons/md";
import NotFound from "../NotFound.jsx";
import {contactStore} from "../../store/contactStore.js";

const MessageList = () => {
    const { messageList, fetchMessageList, deleteMessageRequest} = contactStore();


    const handleDeleteMessage = async (id) => {
        try {
            const isConfirmed = await DeleteAlert();
            if (isConfirmed) {
                const result = await deleteMessageRequest(id);
                if (result.status === true) {
                    successToast(result.message);
                    await fetchMessageList()
                }
            }
        } catch (error) {
            const msg = error?.response?.data?.message || error?.message || "Something went wrong!";
            errorToast(msg);
        }
    };

    if (messageList == null) return <TableSkeleton />;
    if (messageList.length === 0) return <NotFound message="No Message found" />;

    return (
        <div className="py-5">
            <div className="bg-white shadow-sm rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-600 tracking-wider">
                        <tr>
                            <th className="px-6 py-4 text-left">Name</th>
                            <th className="px-6 py-4 text-left">Email</th>
                            <th className="px-6 py-4 text-left">Phone</th>
                            <th className="px-6 py-4 text-left">Subject</th>
                            <th className="px-6 py-4 text-left">Message</th>
                            <th className="px-6 py-4 text-left">Date</th>
                            <th className="px-6 py-4 text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {messageList.map((item) => {
                            const { _id, name, email, phone, subject, message, createdAt} = item;
                            return (
                                <tr key={_id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium">{name}</td>
                                    <td className="px-6 py-4">{email}</td>
                                    <td className="px-6 py-4 capitalize">{phone}</td>
                                    <td className="px-6 py-4">{subject}</td>
                                    <td className="px-6 py-4 text-xs">{message}</td>
                                    <td className="px-6 py-4 text-gray-500">{TimestampToDate(createdAt)}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => handleDeleteMessage(_id)}
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

export default MessageList;
