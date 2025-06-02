import React from 'react';

import {IoMdClose} from "react-icons/io";
import {appointmentStore} from "../../store/appointmentStore.js";
import ValidationHelper, {errorToast, successToast} from "../../helpers/helper.js";
import UserButton from "../UserButton.jsx";
import {userStore} from "../../store/userStore.js";


const AppointmentModal = ({ doctor, onClose }) => {

    const {createAppointment} = appointmentStore()
    const { formData, inputOnChange, setLoading, resetFormData} = userStore();

    const handleAppointment = async (_id) => {

        if(ValidationHelper.IsEmpty(formData.day)){
            errorToast("Please select a day")
        }else if(ValidationHelper.IsEmpty(formData.timeSlot)){
            errorToast("Please select a time slot")
        }else{
            try{
                const data = {
                    day: formData.day,
                    timeSlot: formData.timeSlot,
                }
                setLoading(true)
                const result = await createAppointment(_id, data)
                if(result?.status === true){
                    setLoading(false)
                    successToast(result?.message)
                    resetFormData()
                }
            }catch(error){
                setLoading(false);
                const msg = error?.response?.data?.message || error?.message || "Something went wrong!";
                errorToast(msg);
            }
        }
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-xs backdrop-brightness-90">
            <div className="relative bg-white rounded-lg px-6 py-8 w-full max-w-md shadow-lg">
                <button
                    onClick={onClose}
                    className="cursor-pointer absolute top-2 right-2 text-gray-600 hover:text-red-500 hover:bg-gray-100 p-1 rounded-full transition-all duration-300 text-xl font-bold"
                >
                    <IoMdClose />
                </button>
                <h2 className="text-sm md:text-[16px] font-bold text-[#164193] py-4">
                    Book Appointment with {doctor?.name}
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Day</label>
                        <select
                            value={formData.day}
                            onChange={(e)=> inputOnChange("day", e.target.value)}
                            className="text-sm w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        >
                            <option value="">Day</option>
                            {
                                doctor?.availableSlot?.days.map((day, index) => (
                                    <option key={index} value={day}>{day}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
                        <select
                            value={formData.timeSlot}
                            onChange={(e)=> inputOnChange("timeSlot", e.target.value)}
                            className="text-sm w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        >
                            <option value="">Slot</option>
                            {
                                doctor?.availableSlot?.timeSlots.map((slot, index) => (
                                    <option key={index} value={slot}>{slot}</option>
                                ))
                            }
                        </select>
                    </div>
                    <UserButton
                        onClick={()=> handleAppointment(doctor?.userID)}
                        text="Confirm Appointment"
                        className="cursor-pointer text-sm font-medium w-full mt-4 bg-[#00B092] text-white px-4 py-3 rounded-md hover:bg-[#029e84] transition"
                    />
                </div>
            </div>
        </div>
    );
};

export default AppointmentModal;
