import React, {useEffect} from 'react';
import UserButton from "./UserButton.jsx";
import {userStore} from "../store/userStore.js";
import {specialitiesStore} from "../store/specialitiesStore.js";
import {commonStore} from "../store/commmonStore.js";
import {hospitalStore} from "../store/HospitalStore.js";
import ValidationHelper, {errorToast, successToast} from "../helpers/helper.js";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const timeSlots = ["10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM", "6:00 PM - 8:00 PM"]

const DoctorForm = () => {
    // Destructure state and methods from stores
    const { formData, inputOnChange, setLoading, resetFormData, setAvailableSlotChange, sendDoctorRequest} = userStore();
    const { specialities, fetchSpecialityList } = specialitiesStore();
    const {hospitalList, fetchAllHospitalList} = hospitalStore();

    const {
        divisionList,
        fetchDivisionList,
        districtList,
        fetchDistrictList,
        postList,
        fetchPostList,
    } = commonStore();

    useEffect(() => {
        (async () => {
            await fetchDivisionList();
            await fetchSpecialityList();
            await fetchAllHospitalList();
        })();
    }, []);

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
        const updatedList = formData.availableSlot[key].includes(value)
            ? formData.availableSlot[key].filter((item) => item !== value)
            : [...formData.availableSlot[key], value];
        inputOnChange("availableSlot", {
            ...formData.availableSlot,
            [key]: updatedList,
        });
    };

    const data = new FormData();
    data.append("name", formData.name);
    data.append("registrationNo", formData.registrationNo);
    data.append("designation", formData.designation);
    data.append("experience", formData.experience);
    data.append("gender", formData.gender);
    data.append("degree", formData.degree);
    data.append("consultationFee", formData.consultationFee);
    data.append("division", formData.division);
    data.append("district", formData.district);
    data.append("post", formData.post);
    data.append("area", formData.area);
    data.append("phone", formData.phone);
    data.append("hospitalID", formData.hospitalID);
    data.append("specialityID", formData.specialityID);
    data.append("image", formData.image);
    data.append("availableSlot", JSON.stringify({
        days: formData.availableSlot.days,
        timeSlots: formData.availableSlot.timeSlots,
    }));

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Client-side validation
        if (ValidationHelper.IsEmpty(formData.name)) {
            errorToast("Name is required");
        } else if (ValidationHelper.IsEmpty(formData.registrationNo)) {
            errorToast("RegistrationNo is required");
        }
        else if(ValidationHelper.IsEmpty(formData.designation)) {
            errorToast("Designation is required");
        }
        else if (ValidationHelper.IsEmpty(formData.experience)) {
            errorToast("Experience is required");
        }
        else if (ValidationHelper.IsEmpty(formData.degree)) {
            errorToast("Degree is required");
        }
        else if (ValidationHelper.IsEmpty(formData.consultationFee)) {
            errorToast("ConsultationFee is required");
        }
        else if (ValidationHelper.IsEmpty(formData.experience)) {
            errorToast("Experience is required");
        }
        else if (!formData.availableSlot.days.length) {
            return errorToast("Select at least one available day");
        }
        else if (!formData.availableSlot.timeSlots.length) {
            return errorToast("Select at least one time slot");
        }
        else if(ValidationHelper.IsEmpty(formData.division)) {
            errorToast("Division is required");
        }
        else if(ValidationHelper.IsEmpty(formData.district)) {
            errorToast("District is required");
        }
        else if(ValidationHelper.IsEmpty(formData.post)) {
            errorToast("Post is required");
        }
        else if(ValidationHelper.IsEmpty(formData.area)) {
            errorToast("Area is required");
        }
        else if(ValidationHelper.IsEmpty(formData.phone)) {
            errorToast("Phone is required");
        }
        else if(!ValidationHelper.IsMobile(formData.phone)) {
            errorToast("Phone must be valid");
        }
         else if (ValidationHelper.IsEmpty(formData.hospitalID)) {
            errorToast("Hospital is required");
        }
        else if (ValidationHelper.IsEmpty(formData.specialityID)) {
            errorToast("Specialization is required");
        } else {
            // Submit data
            try {
                setLoading(true); // Show loading state
                let result = await sendDoctorRequest(data);
                if (result.status === true) {
                    setLoading(false);
                    successToast(result.message); // Show success toast
                    resetFormData();
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
        <div className="py-10 px-4 md:px-0 relative h-auto flex justify-center items-center bg-[url(/images/hero_bg.jpg)] bg-center bg-cover bg-no-repeat bg-fixed">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-[#57958C] opacity-40 z-10"></div>
            <form onSubmit={handleFormSubmit}
                className="bg-white z-30 w-full sm:w-full md:w-[65%] px-4 sm:px-6 md:px-10 py-10 rounded-md" encType={"multipart/form-data"}>
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 text-center">
                        <h1 className="text-[#164193] text-2xl font-medium">Doctor Registration Form</h1>
                        <hr className="border border-gray-200 my-2"/>
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                        <input
                            value={formData.name}
                            onChange={(e) => inputOnChange("name", e.target.value)}
                            name="name" type="text" placeholder="Full Name"
                            className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"/>
                    </div>


                    <div className="col-span-12 sm:col-span-6">
                        <input
                            value={formData.designation}
                            onChange={(e) => inputOnChange("designation", e.target.value)}
                            name="designation" type="text" placeholder="Designation"
                            className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"/>
                    </div>

                    <div className="col-span-12">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-4">
                                <input
                                    value={formData.registrationNo}
                                    onChange={(e) => inputOnChange("registrationNo", e.target.value)}
                                    name="registrationNo" type="text" placeholder="Registration Number"
                                    className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"/>

                            </div>
                            <div className="col-span-4">
                                <input
                                    value={formData.experience}
                                    onChange={(e) => inputOnChange("experience", e.target.value)}
                                    name="experience" type="number" placeholder="Years of Experience"
                                    className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"/>
                            </div>
                            <div className="col-span-4">
                                <select
                                    className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"
                                    value={formData.gender}
                                    onChange={(e)=>inputOnChange("gender", e.target.value)}
                                >
                                    <option value="">Gender</option>
                                    {['Male', 'Female', 'Other'].map((item, index)=>{
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
                        <input
                            value={formData.degree}
                            onChange={(e) => inputOnChange("degree", e.target.value)}
                            name="degree" type="text" placeholder="Degree"
                            className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"/>
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                        <input
                            value={formData.consultationFee}
                            onChange={(e) => inputOnChange("consultationFee", e.target.value)}
                            name="consultationFee" type="text" placeholder="Consultation Fees"
                            className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"/>
                    </div>

                    {/* Available Days Checkboxes */}
                    <div className="col-span-12 sm:col-span-6">
                        <label className="text-gray-600 text-sm font-medium mb-2 block">Available Days</label>
                        <div className="grid grid-cols-3 gap-2">
                            {days.map(day => (
                                <label
                                    key={day}
                                    className="flex items-center justify-center border border-gray-300 rounded-full px-4 py-2 text-sm cursor-pointer bg-white text-gray-700 hover:bg-[#00B092] hover:text-white transition"
                                >
                                    <input
                                        value={formData.availableSlot.days}
                                        checked={formData.availableSlot.days.includes(day)}
                                        onChange={() => handleCheckChange("days", day)}
                                        type="checkbox" name="availableSlot.days" className="hidden peer"/>
                                    <span
                                        className="peer-checked:text-white peer-checked:bg-[#00B092] w-full text-center">{day}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Available Time Slots Checkboxes */}
                    <div className="col-span-12 sm:col-span-6 text-sm">
                        <label className="text-gray-600 font-medium mb-2 block">Available Slots</label>
                        <div className="grid grid-cols-2 gap-2">
                            {timeSlots.map(slot => (
                                <label
                                    key={slot}
                                    className="flex items-center justify-center border border-gray-300 rounded-full px-3 py-2 text-sm cursor-pointer bg-white text-gray-700 hover:bg-[#00B092] hover:text-white transition"
                                >
                                    <input
                                        checked={formData.availableSlot.timeSlots.includes(slot)}
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
                                <select
                                    className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"
                                    value={formData.division}
                                    onChange={handleDistrictChange}
                                >
                                    <option value="">Division</option>
                                    {divisionList?.map(({_id, name}) => (
                                        <option value={name} key={_id}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-4">
                                <select
                                    className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"
                                    value={formData.district}
                                    onChange={handlePostChange}
                                >
                                    <option value="">District</option>
                                    {districtList?.map(({_id, name}) => (
                                        <option value={name} key={_id}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-4">
                                <select
                                    className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"
                                    value={formData.post}
                                    onChange={(e) => inputOnChange("post", e.target.value)}
                                >
                                    <option value="">Post</option>
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
                        <input
                            value={formData.area}
                            onChange={(e) => inputOnChange("area", e.target.value)}
                            name="area" type="text" placeholder="Area"
                            className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"/>
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                        <input
                            value={formData.phone}
                            onChange={(e) => inputOnChange("phone", e.target.value)}
                            name="phone" type="tel" placeholder="Phone Number"
                            className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"/>
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                        <input
                            type="file"
                            accept="image/*"
                            name="image"
                            onChange={(e) => inputOnChange("image", e.target.files[0])}
                            className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 bg-white focus:outline-0 focus:shadow-sm"
                        />
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                        <select
                            className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"
                            value={formData.hospitalID}
                            onChange={(e) => inputOnChange("hospitalID", e.target.value)}
                        >
                            <option value="">Hospital</option>
                            {hospitalList?.map(({_id, name}) => (
                                <option value={_id} key={_id}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                        <select
                            className="w-full border border-gray-200 px-3 py-2 rounded text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50"
                            value={formData.specialityID}
                            onChange={(e) => inputOnChange("specialityID", e.target.value)}
                        >
                            <option value="">Specialization</option>
                            {specialities?.data?.map(({_id, name}) => (
                                <option value={_id} key={_id}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-12">
                        <UserButton
                            className="w-full sm:w-[30%] md:w-[30%] text-sm text-white px-8 py-3 font-medium bg-[#00B092] rounded cursor-pointer hover:bg-[#009e84] transition"
                            text="Submit"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default DoctorForm;
