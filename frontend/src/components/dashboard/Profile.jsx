import React, {useRef} from "react";
import {userStore} from "../../store/userStore.js";
import UserButton from "../UserButton.jsx";
import ValidationHelper, {errorToast, successToast} from "../../helpers/helper.js";
import PasswordChange from "./PasswordChange.jsx";

const Profile = () => {
    const fileInputRef = useRef();

    const {formData, setLoading, saveUserProfile, resetFormData, inputOnChange, profileDetails,fetchProfileDetails} = userStore();

    const {
        name,
        image,
        gender,
        phone,
        address
    } = formData

    const genderList = ["Male", "Female", "Other"]

    const inputFields = [
        {type: "text", value: name , name: "name", label: "Full Name", placeholder: "Full Name Ex. (John doe)", onChange: (e)=>{inputOnChange("name", e.target.value)} },
        {type: "email", value: profileDetails?.email, name: "email", label: "Email", placeholder: "exmaple@gmail.com"},
        {type: "tel", value: phone, name: "phone", label: "Phone", placeholder: "+880", onChange: (e)=>{inputOnChange("phone", e.target.value)} },
        {type: "select", value: gender, name: "gender", label: "Gender", options: genderList, onChange: (e)=>{inputOnChange("gender", e.target.value)} },
        {type: "text", value: address, name: "address", label: "Address", placeholder: "Write your address...", onChange: (e)=>{inputOnChange("address", e.target.value)} },
        {type: "file", name: "image", label: "Profile Image",  onChange: (e)=>{inputOnChange("image", e.target.files[0])} },
    ]


    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        if(ValidationHelper.IsEmpty(name)){
            errorToast("Name is required");
        }else if(ValidationHelper.IsEmpty(phone)){
            errorToast("Phone is required");
        }else if(!ValidationHelper.IsMobile(phone)){
            errorToast("Phone number must be valid");
        }else if(ValidationHelper.IsEmpty(gender)){
            errorToast("Gender is required");
        }
        else if(ValidationHelper.IsEmpty(address)){
            errorToast("Address is required");
        }else{
            const data = new FormData();
            data.append("name", name)
            data.append("image", image)
            data.append("phone", phone);
            data.append("gender", gender);
            data.append("address", address);
            try {
                setLoading(true);
                let result = await saveUserProfile(data);
                if(result.status === true){
                    setLoading(false);
                    successToast(result?.message);
                    fileInputRef.current.value = "";
                    resetFormData()
                    await fetchProfileDetails();
                }
            }catch(error){
                const msg =
                    error?.response?.data?.message || error?.message || 'Something went wrong!';
                errorToast(msg);
            }
        }
    }


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto py-3">
            {/* left: Update Profile Form */}
            <div className="bg-white shadow-sm rounded-xl p-6">
                <h2 className="text-lg text-center font-semibold">Update Profile</h2>
                <hr className="border border-gray-200 my-3"/>
                <div className="flex justify-center items-center py-2">
                    <img
                        src={formData?.image || '/images/default-avatar.png'}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border shadow"
                    />
                </div>
                <form onSubmit={handleProfileUpdate}
                      className="space-y-5"
                      encType="multipart/form-data">

                    {
                        inputFields.map((item, index) => {
                            const {
                                type,
                                name,
                                value,
                                placeholder,
                                label,
                                onChange,
                                options = [],
                            } = item;

                            return (
                                <div key={index}>
                                    <label className="block text-sm font-medium mb-2 px-1 text-gray-700">
                                        {label}
                                    </label>

                                    {type === "select" ? (
                                        <select
                                            name={name}
                                            value={value}
                                            onChange={onChange}
                                            className="text-gray-700 text-sm w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                        >
                                            <option value="">
                                                {value ? value : `Select ${label}`}
                                            </option>
                                            {options?.map((opt, i) => (
                                                <option key={i} value={opt.name || opt}>
                                                    {opt.name || opt}
                                                </option>
                                            ))}
                                        </select>
                                    ) : type === 'file' ?(
                                        <input
                                            ref={fileInputRef}
                                            type={type}
                                            name={name}
                                            value={value}
                                            placeholder={placeholder}
                                            onChange={onChange}
                                            className="text-gray-700 text-sm w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                        />
                                    ): (
                                        <input
                                            type={type}
                                            name={name}
                                            value={value}
                                            placeholder={placeholder}
                                            onChange={onChange}
                                            className="text-gray-700 text-sm w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                        />
                                    )
                                    }
                                </div>
                            );
                        })
                    }


                    <UserButton
                        className="w-full text-sm text-white px-8 py-3 font-medium bg-[#00B092] rounded cursor-pointer hover:bg-[#009e84] transition"
                        text="Save Changes"
                    />
                </form>
            </div>

            {/* left: password change Form */}
            <PasswordChange />

        </div>
    );
};

export default Profile;
