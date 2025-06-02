import React, {useEffect} from 'react';

import UserButton from "../UserButton.jsx";
import {commonStore} from "../../store/commmonStore.js";
import ValidationHelper, {errorToast, successToast} from "../../helpers/helper.js";
import {useRef} from "react";
import {doctorStore} from "../../store/doctorStore.js";
import {specialitiesStore} from "../../store/specialitiesStore.js";
import {hospitalStore} from "../../store/HospitalStore.js";
import {userStore} from "../../store/userStore.js";


const DoctorProfile = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const timeSlots = ["10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM", "6:00 PM - 8:00 PM"]
    const fileInputRef = useRef(null);
    const {divisionList, districtList, postList, fetchDivisionList, fetchDistrictList, fetchPostList} = commonStore()
    const {specialities, fetchSpecialtiesList} = specialitiesStore()
    const {hospitalList, fetchAllHospitalList} = hospitalStore()
    const {updateDoctorProfile} = doctorStore()
    const {setLoading, resetFormData, inputOnChange, formData, profileDetails, fetchDoctorProfile} = userStore()


    useEffect(() => {
        (async () => {
            await fetchDivisionList();
            await fetchSpecialtiesList();
            await fetchAllHospitalList()
        })();
    }, []);

    const {
        name,
        registrationNo,
        experience,
        degree,
        division,
        district,
        post,
        availableSlot,
        specialityID,
        hospitalID,
        phone,
        area,
        image,
        consultationFee,
        gender,
        designation
    } = formData || {}

    const handleDistrictChange = async (e) => {
        const division = e.target.value;
        await fetchDistrictList(division);
        inputOnChange("division", division);
    };

    const handlePostChange = async (e) => {
        const district = e.target.value;
        await fetchPostList(district);
        inputOnChange("district", district);
    };

    const handleCheckChange = (key, value) => {
        const updatedList = availableSlot[key].includes(value)
            ? availableSlot[key].filter((item) => item !== value)
            : [...availableSlot[key], value];
        inputOnChange("availableSlot", {
            ...availableSlot,
            [key]: updatedList,
        });
    };



    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Client-side validation
        if (ValidationHelper.IsEmpty(name)) {
            errorToast("Name is required");
        } else if (ValidationHelper.IsEmpty(registrationNo)) {
            errorToast("RegistrationNo is required");
        } else if (ValidationHelper.IsEmpty(designation)) {
            errorToast("Designation is required");
        } else if (ValidationHelper.IsEmpty(experience)) {
            errorToast("Experience is required");
        } else if (ValidationHelper.IsEmpty(degree)) {
            errorToast("Degree is required");
        } else if (ValidationHelper.IsEmpty(consultationFee)) {
            errorToast("ConsultationFee is required");
        } else if (!availableSlot.days.length) {
            return errorToast("Select at least one available day");
        } else if (!availableSlot.timeSlots.length) {
            return errorToast("Select at least one time slot");
        } else if (ValidationHelper.IsEmpty(division)) {
            errorToast("Division is required");
        } else if (ValidationHelper.IsEmpty(district)) {
            errorToast("District is required");
        } else if (ValidationHelper.IsEmpty(post)) {
            errorToast("Post is required");
        } else if (ValidationHelper.IsEmpty(area)) {
            errorToast("Area is required");
        } else if (ValidationHelper.IsEmpty(phone)) {
            errorToast("Phone is required");
        } else if (!ValidationHelper.IsMobile(phone)) {
            errorToast("Phone must be valid");
        } else if (ValidationHelper.IsEmpty(hospitalID)) {
            errorToast("Hospital is required");
        } else if (ValidationHelper.IsEmpty(specialityID)) {
            errorToast("Specialization is required");
        } else {
            // Submit data
            try {
                const data = new FormData();
                data.append("name", name);
                data.append("registrationNo", registrationNo);
                data.append("designation", designation);
                data.append("experience", experience);
                data.append("gender", gender);
                data.append("degree", degree);
                data.append("consultationFee", consultationFee);
                data.append("division", division);
                data.append("district", district);
                data.append("post", post);
                data.append("area", area);
                data.append("phone", phone);
                data.append("hospitalID", hospitalID);
                data.append("specialityID", specialityID);
                data.append("image", image || '/images/default-doctor.png');
                data.append("availableSlot", JSON.stringify({
                    days: availableSlot?.days,
                    timeSlots: availableSlot?.timeSlots,
                }));
                setLoading(true); // Show loading state
                let result = await updateDoctorProfile(data);
                if (result.status === true) {
                    setLoading(false);
                    successToast(result.message); // Show success toast
                    fileInputRef.current.value = null; // Reset file input value after submit
                    resetFormData();
                    await fetchDoctorProfile()
                } else {
                    setLoading(false);
                    errorToast(result.message); // Show error toast
                }
            } catch (error) {
                setLoading(false);
                errorToast(error.response?.data?.message || "Something went wrong");
            }
        }
    };

    return (
        <div className="bg-white shadow-sm rounded-xl p-6">
            <h2 className="text-lg text-center font-semibold">Update Profile</h2>
            <hr className="border border-gray-200 my-3"/>
            <div className="flex justify-center items-center py-3">
                <img
                    src={formData?.image || '/images/default-avatar.png'}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border shadow"
                />
            </div>

            <form onSubmit={handleFormSubmit}
                  className="bg-white rounded-md"
                  encType={"multipart/form-data"}>
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 sm:col-span-6">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Full name</label>
                        <input
                            value={name}
                            onChange={(e) => inputOnChange("name", e.target.value)}
                            name="name"
                            type="text"
                            placeholder="Full name: (Ex. John Doe)"
                            className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"/>
                    </div>


                    <div className="col-span-12 sm:col-span-6">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Designation</label>
                        <input
                            value={designation}
                            onChange={(e) => inputOnChange("designation", e.target.value)}
                            name="designation" type="text" placeholder="Designation"
                            className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"/>
                    </div>

                    <div className="col-span-12">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-4">
                                <label className="block text-sm font-medium mb-2 text-gray-700">Registration No.</label>
                                <input
                                    value={registrationNo}
                                    onChange={(e) => inputOnChange("registrationNo", e.target.value)}
                                    name="registrationNo" type="text" placeholder="Registration Number"
                                    className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"/>

                            </div>
                            <div className="col-span-4">
                                <label className="block text-sm font-medium mb-2 text-gray-700">Experience (Years)</label>
                                <input
                                    value={experience}
                                    onChange={(e) => inputOnChange("experience", e.target.value)}
                                    name="experience" type="number" placeholder="Years of Experience"
                                    className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"/>
                            </div>
                            <div className="col-span-4">
                                <label className="block text-sm font-medium mb-2 text-gray-700">Gender</label>
                                <select
                                    className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"
                                    value={gender}
                                    onChange={(e) => inputOnChange("gender", e.target.value)}
                                >
                                    <option value="">Select Gender</option>
                                    {['Male', 'Female', 'Other'].map((item, index) => {
                                        return (
                                            <option value={item} key={index}>
                                                {item}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>


                    <div className="col-span-12 sm:col-span-6">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Degree</label>
                        <input
                            value={degree}
                            onChange={(e) => inputOnChange("degree", e.target.value)}
                            name="degree" type="text" placeholder="Degree"
                            className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"/>
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Consultation Fees</label>
                        <input
                            value={consultationFee}
                            onChange={(e) => inputOnChange("consultationFee", e.target.value)}
                            name="consultationFee" type="text" placeholder="Consultation Fees"
                            className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"/>
                    </div>

                    {/* Available Days Checkboxes */}
                    <div className="col-span-12 text-sm">
                        <label className="text-gray-600 text-sm font-medium mb-2 block">Available Days</label>
                        <div className="grid grid-cols-3 gap-2">
                            {days.map(day => (
                                <label
                                    key={day}
                                    className="flex items-center justify-center border border-gray-300 rounded-full px-2 py-2 text-sm cursor-pointer bg-white text-gray-700 hover:bg-[#00B092] hover:text-white transition"
                                >
                                    <input
                                        value={availableSlot?.days}
                                        checked={availableSlot?.days.includes(day)}
                                        onChange={() => handleCheckChange("days", day)}
                                        type="checkbox" name="availableSlot.days" className="hidden peer"/>
                                    <span
                                        className="peer-checked:text-white peer-checked:bg-[#00B092] w-full text-center">{day}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Available Time Slots Checkboxes */}
                    <div className="col-span-12 text-sm">
                        <label className="text-gray-600 font-medium mb-2 block">Available Slots</label>
                        <div className="grid grid-cols-2 gap-2">
                            {timeSlots.map(slot => (
                                <label
                                    key={slot}
                                    className="flex items-center justify-center border border-gray-300 rounded-full px-2 py-2 text-sm cursor-pointer bg-white text-gray-700 hover:bg-[#00B092] hover:text-white transition"
                                >
                                    <input
                                        checked={availableSlot?.timeSlots.includes(slot)}
                                        onChange={() => handleCheckChange("timeSlots", slot)}
                                        type="checkbox" name="availableSlot.timeSlots" className="hidden peer"/>
                                    <span
                                        className="peer-checked:text-white peer-checked:bg-[#00B092] w-full text-center">{slot}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-12">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-4">
                                <label className="block text-sm font-medium mb-2 text-gray-700">Division</label>
                                <select
                                    className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"
                                    value={division}
                                    onChange={handleDistrictChange}
                                >
                                    <option value="">{division}</option>
                                    {divisionList?.map(({_id, name}) => (
                                        <option value={name} key={_id}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-4">
                                <label className="block text-sm font-medium mb-2 text-gray-700">District</label>
                                <select
                                    className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"
                                    value={district}
                                    onChange={handlePostChange}
                                >
                                    <option value="">{district}</option>
                                    {districtList?.map(({_id, name}) => (
                                        <option value={name} key={_id}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-4">
                                <label className="block text-sm font-medium mb-2 text-gray-700">Post</label>
                                <select
                                    className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"
                                    value={post}
                                    onChange={(e) => inputOnChange("post", e.target.value)}
                                >
                                    <option value="">{post}</option>
                                    {postList?.map(({_id, name}) => (
                                        <option value={name} key={_id}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Working Area</label>
                        <input
                            value={area}
                            onChange={(e) => inputOnChange("area", e.target.value)}
                            name="area" type="text" placeholder="Area"
                            className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"/>
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Contact No.</label>
                        <input
                            value={phone}
                            onChange={(e) => inputOnChange("phone", e.target.value)}
                            name="phone" type="tel" placeholder="Phone Number"
                            className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"/>
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Profile Image</label>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            name="image"
                            onChange={(e) => inputOnChange("image", e.target.files[0])}
                            className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 bg-white focus:outline-0 focus:shadow-sm"
                        />
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Hospital</label>
                        <select
                            className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"
                            value={hospitalID}
                            onChange={(e) => inputOnChange("hospitalID", e.target.value)}
                        >
                            <option value="">Select Hospital</option>
                            {hospitalList?.map(({_id, name}) => (
                                <option value={_id} key={_id}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Specialty</label>
                        <select
                            className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"
                            value={specialityID}
                            onChange={(e) => inputOnChange("specialityID", e.target.value)}
                        >
                            <option value="">Select Specialty</option>
                            {specialities?.data?.map(({_id, name}) => (
                                <option value={_id} key={_id}>{name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-12">
                        <UserButton
                            className="w-full text-sm text-white px-8 py-3 font-medium bg-[#00B092] rounded cursor-pointer hover:bg-[#009e84] transition"
                            text="Submit"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default DoctorProfile;
