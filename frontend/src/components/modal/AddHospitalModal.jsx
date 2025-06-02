import React, {useState, useRef, useEffect} from 'react';
import { IoMdClose } from 'react-icons/io';
import { MdAttachFile } from 'react-icons/md';
import { userStore } from '../../store/userStore.js';
import ValidationHelper, { errorToast, successToast } from '../../helpers/helper.js';
import UserButton from '../UserButton.jsx';
import {hospitalStore} from "../../store/hospitalStore.js";
import {commonStore} from "../../store/commmonStore.js";

const AddHospitalModal = ({onClose}) => {
    const [image, setImage] = useState("/images/hospital.png");
    const fileInputRef = useRef(null);
    const {divisionList, districtList, postList, fetchDivisionList, fetchDistrictList, fetchPostList} = commonStore()
    const { setLoading } = userStore();
    const {addHospital, fetchAllHospitalList, formData, inputOnChange, resetFormData} = hospitalStore()


    useEffect(()=>{
        (async ()=>{
            await fetchDivisionList()
            resetFormData()
        })()
    }, [])

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
            inputOnChange('image', file);
        }
    };

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

    const handleHospitalSubmit = async (e) => {
        e.preventDefault();

        // VALIDATION
        // if (ValidationHelper.IsEmpty(formData.image)) return errorToast("Image is required");
        if (ValidationHelper.IsEmpty(formData.name.trim())) return errorToast("Name is required");
        if (ValidationHelper.IsEmpty(formData.division.trim())) return errorToast("Please select division");
        if (ValidationHelper.IsEmpty(formData.district.trim())) return errorToast("Please select district");
        if (ValidationHelper.IsEmpty(formData.post.trim())) return errorToast("Please select post");
        if (ValidationHelper.IsEmpty(formData.area.trim())) return errorToast("Area is required");
        // if (ValidationHelper.IsEmpty(formData.phone.trim())) return errorToast("Phone is required");
        // if (!ValidationHelper.IsMobile(formData.phone)) return errorToast("Phone number not valid");
        // if (ValidationHelper.IsEmpty(formData.email.trim())) return errorToast("Email is required");
        // if (!ValidationHelper.IsEmail(formData.email)) return errorToast("Email not valid");

        const data = new FormData();
        data.append('image', formData.image || '/images/hospital.png');
        data.append('name', formData.name);
        data.append('division', formData.division);
        data.append('district', formData.district);
        data.append('post', formData.post);
        data.append('area', formData.area);
        data.append('phone', formData.phone || 'N/A');
        data.append('email', formData.email || 'N/A');
        data.append('website', formData.website || 'N/A');


        try {
            setLoading(true);
            const result = await addHospital(data);
            if (result.status === true) {
                successToast(result?.message);
                await fetchAllHospitalList();
                setLoading(false);
                fileInputRef.current.value = null;
                resetFormData();
                onClose(); // auto modal close
            } else {
                errorToast(result?.message || 'Failed to post blog.');
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            const msg =
                err?.response?.data?.message || err?.message || 'Something went wrong!';
            errorToast(msg);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs backdrop-brightness-90 px-4 sm:px-6 py-10 overflow-y-auto">
            <div className="relative bg-white rounded-lg w-full max-w-lg shadow-lg">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="cursor-pointer hover:bg-gray-100 p-1 rounded-full transition-all duration-300 absolute top-3 right-3 text-gray-500 hover:text-red-500 transition text-xl"
                >
                    <IoMdClose/>
                </button>

                {/* Thumbnail Preview with Upload Icon */}
                <div className="relative w-20 h-20 mx-auto mt-5">
                    <label htmlFor="fileInput" className="cursor-pointer">
                        <img
                            src={image}
                            alt="Thumbnail"
                            className="w-20 h-20 object-cover rounded-full text-sm border border-blue-400 shadow "
                        />
                        <div className="absolute bottom-0 right-0 bg-white border rounded-full p-1 shadow">
                            <MdAttachFile className="text-gray-600"/>
                        </div>
                    </label>
                    <input
                        id="fileInput"
                        name="image"
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>

                {/* hospital Form */}
                <form onSubmit={handleHospitalSubmit}
                      className="bg-white z-30 w-full px-4 sm:px-6 md:px-8 py-10 rounded-md"
                      encType={"multipart/form-data"}>
                    <div className="grid grid-cols-12 gap-6">

                        <div className="col-span-12 md:col-span-6">
                            <input
                                value={formData?.name}
                                onChange={(e) => inputOnChange("name", e.target.value)}
                                name="name" type="text" placeholder="Name"
                                className="text-gray-700 text-sm w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"/>
                        </div>

                        <div className="col-span-12 md:col-span-6">
                            <input
                                value={formData?.phone}
                                onChange={(e) => inputOnChange("phone", e.target.value)}
                                name="phone" type="text" placeholder="Phone"
                                className="text-gray-700 text-sm w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"/>
                        </div>


                        <div className="col-span-12 sm:col-span-6">
                            <input
                                value={formData?.email}
                                onChange={(e) => inputOnChange("email", e.target.value)}
                                name="email" type="email" placeholder="Email"
                                className="text-gray-700 text-sm w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"/>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <input
                                value={formData?.website}
                                onChange={(e) => inputOnChange("website", e.target.value)}
                                name="website" type="text" placeholder="Website"
                                className="text-gray-700 text-sm w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"/>
                        </div>


                        <div className="col-span-12">
                            <div className="grid grid-cols-12 gap-6">
                                <div className="col-span-4">
                                    <select
                                        className="text-gray-700 text-sm w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                        value={formData?.division}
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
                                        className="text-gray-700 text-sm w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                        value={formData?.district}
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
                                        className="text-gray-700 text-sm w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                        value={formData?.post}
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

                        <div className="col-span-12">
                            <input
                                value={formData?.area}
                                onChange={(e) => inputOnChange("area", e.target.value)}
                                name="area" type="text" placeholder="Area"
                                className="text-gray-700 text-sm w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"/>
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
        </div>
    );
};

export default AddHospitalModal;
