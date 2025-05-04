import React from 'react';
import {IoMdClose} from "react-icons/io";

const AppointmentModal = ({ doctor, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="relative bg-white rounded-lg px-6 py-8 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 max-w-md shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
                >
                    <IoMdClose />
                </button>
                <h2 className="text-lg font-bold text-[#164193] mb-4">
                    Book Appointment with {doctor?.name}
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Day</label>
                        <select
                            className="text-sm w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        >
                            <option value="">Select Day</option>
                            {
                                doctor?.availableSlots?.day.map((day, index) => (
                                    <option key={index} value={day}>{day}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
                        <select
                            className="text-sm w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        >
                            <option value="">Select Time Slot</option>
                            {
                                doctor?.availableSlots?.timeSlot.map((slot, index) => (
                                    <option key={index} value={slot}>{slot}</option>
                                ))
                            }
                        </select>
                    </div>
                    <button
                        className="cursor-pointer text-sm font-bold w-full mt-4 bg-[#00B092] text-white px-4 py-3 rounded-md hover:bg-[#029e84] transition"
                    >
                        Confirm Appointment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AppointmentModal;
