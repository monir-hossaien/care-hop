import React, {useState, useRef, useEffect} from 'react';
import { IoMdClose } from 'react-icons/io';
import { MdAttachFile } from 'react-icons/md';
import { userStore } from '../../store/userStore.js';
import ValidationHelper, { errorToast, successToast } from '../../helpers/helper.js';
import UserButton from '../UserButton.jsx';
import {specialitiesStore} from "../../store/specialitiesStore.js";

const UpdateSpecialtyModal = ({ specialty, onClose }) => {
    const [image, setImage] = useState("/images/default-specialty.png");
    const fileInputRef = useRef(null);
    const { setLoading } = userStore();
    const {
        formData,
        inputOnChange,
        resetFormData,
        fetchSpecialtiesList,
        updateSpecialty,
        readSpecialty
    } = specialitiesStore();
    const {_id} = specialty;

    // Load specialty data when modal opens
    useEffect(() => {
        (async () => {
            resetFormData();
            await readSpecialty(_id);
        })();
    }, [_id]);

    // Sync image state when formData.image changes
    useEffect(() => {
        if (formData?.image) {
            if (typeof formData.image === 'string') {
                setImage(formData.image);
            } else {
                const reader = new FileReader();
                reader.onload = () => setImage(reader.result);
                reader.readAsDataURL(formData.image);
            }
        }
    }, [formData.image]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
            inputOnChange('image', file);
        }
    };

    const handleUpdateSpecialty = async (e) => {
        e.preventDefault();
        // VALIDATION
        if (ValidationHelper.IsEmpty(formData.name)) return errorToast("Name is required");
        if (ValidationHelper.IsEmpty(formData.image)) return errorToast("Image is required");
        if (ValidationHelper.IsEmpty(formData.description)) return errorToast("Description is required");

        const data = new FormData();
        data.append('name', formData.name);
        data.append('image', formData.image);
        data.append('description', formData.description);

        try {
            setLoading(true);
            const result = await updateSpecialty(_id, data);
            if (result.status === true) {
                successToast(result?.message);
                await fetchSpecialtiesList();
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
            <div className="relative bg-white rounded-lg w-full max-w-md shadow-lg">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="cursor-pointer hover:bg-gray-100 p-1 rounded-full transition-all duration-300 absolute top-3 right-3 text-gray-500 hover:text-red-500 transition text-xl"
                >
                    <IoMdClose />
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
                            <MdAttachFile className="text-gray-600" />
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

                {/* Blog Form */}
                <form
                    onSubmit={handleUpdateSpecialty}
                    className="p-6 pt-6 space-y-5"
                    encType="multipart/form-data"
                >
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">Add Specialties Info</h2>
                    <input
                        name="name"
                        type="text"
                        placeholder="name"
                        value={formData?.name}
                        onChange={(e) => inputOnChange('name', e.target.value)}
                        className="text-gray-700 text-sm w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />

                    <textarea
                        rows={4}
                        name="description"
                        value={formData?.description}
                        onChange={(e) => inputOnChange('description', e.target.value)}
                        placeholder="Description must be at least 30 characters."
                        className="text-gray-700 text-sm w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />

                    <UserButton
                        className="cursor-pointer w-full text-sm text-white px-4 py-3 font-medium bg-[#00B092] rounded-md hover:bg-[#009e84] transition"
                        text="Submit"
                    />
                </form>
            </div>
        </div>
    );
};

export default UpdateSpecialtyModal;
