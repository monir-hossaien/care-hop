import React, {useState} from 'react';
import {FaLock} from "react-icons/fa";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {userStore} from "../../store/userStore.js";
import {errorToast, successToast} from "../../helpers/helper.js";
import {CgSpinner} from "react-icons/cg";

const passwordForm = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
}

const PasswordChange = () => {

    const {changePassword} = userStore()
    const [visibility, setVisibility] = useState(passwordForm);
    const [formData, setFormData] = useState(passwordForm);
    const [loading, setLoading] = useState(false);

    const toggleVisibility = (key) => {
        setVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const resetFormDat = () => {
        formData.oldPassword = '';
        formData.newPassword = '';
        formData.confirmPassword = '';
    }

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            return errorToast("New password and confirm password do not match");
        }else if(formData.oldPassword === formData.newPassword) {
            return errorToast("New password is your existing password");
        }else{
            try {
                setLoading(true);
                let result = await changePassword(formData);
                if(result.status === true){
                    setLoading(false);
                    successToast(result?.message);
                    resetFormDat();
                }
            }catch(error){
                const msg =
                    error?.response?.data?.message || error?.message || 'Something went wrong!';
                errorToast(msg);
                setLoading(false);
            }
        }
    }

    return (
        <>
            <div className="bg-white shadow-sm rounded-xl p-6 h-fit">
                <h2 className="text-lg text-center font-semibold">Change Password</h2>
                <hr className="border border-gray-200 my-3"/>
                <form onSubmit={handlePasswordChange} className="space-y-6">

                    {/* Old Password */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Old Password</label>
                        <div
                            className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring focus-within:ring-blue-200">
                            <FaLock className="text-gray-400 mr-3"/>
                            <input
                                required={true}
                                type={visibility.oldPassword ? 'text' : 'password'}
                                placeholder="Old Password"
                                value={formData?.oldPassword || ''}
                                onChange={(e) => setFormData({...formData, oldPassword: e.target.value})}
                                className="flex-1 text-sm text-gray-700 focus:outline-none"
                            />
                            <div
                                className="ml-3 cursor-pointer text-xl text-gray-400"
                                onClick={() => toggleVisibility('oldPassword')}
                            >
                                {visibility.oldPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                            </div>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-medium mb-2">New Password</label>
                        <div
                            className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring focus-within:ring-blue-200">
                            <FaLock className="text-gray-400 mr-3"/>
                            <input
                                required={true}
                                type={visibility.newPassword ? 'text' : 'password'}
                                placeholder="New Password"
                                value={formData?.newPassword || ''}
                                onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                                className="flex-1 text-sm text-gray-700 focus:outline-none"
                            />
                            <div
                                className="ml-3 cursor-pointer text-xl text-gray-400"
                                onClick={() => toggleVisibility('newPassword')}
                            >
                                {visibility.newPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                            </div>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Confirm Password</label>
                        <div
                            className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring focus-within:ring-blue-200">
                            <FaLock className="text-gray-400 mr-3"/>
                            <input
                                required={true}
                                type={visibility.confirmPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                value={formData?.confirmPassword || ''}
                                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                className="flex-1 text-sm text-gray-700 focus:outline-none"
                            />
                            <div
                                className="ml-3 cursor-pointer text-xl text-gray-400"
                                onClick={() => toggleVisibility('confirmPassword')}
                            >
                                {visibility.confirmPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                            </div>
                        </div>
                    </div>

                    <button
                        className="w-full text-sm text-white px-8 py-3 font-medium bg-[#00B092] rounded cursor-pointer hover:bg-[#009e84] transition"
                    >{loading ? <span className="flex justify-center items-center gap-1"><CgSpinner className="animate-spin text-xl" />Processing...</span>: 'Password Changes'}</button>
                </form>
            </div>
        </>
    );
};

export default PasswordChange;