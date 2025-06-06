import { create } from "zustand";
import axios from "axios";
import { unauthorized } from "../helpers/helper.js";
import { userStore } from "./userStore.js";


const base_url = "https://care-hop.vercel.app/api/v1";

export const doctorStore = create((set, get) => ({
    doctorList: null,

    formData: userStore.getState().formData,


    // Fetch all doctors (for admin or public)
    fetchDoctorList: async () => {
        try {
            const result = await axios.get(`${base_url}/fetch-doctor-list`, {
                withCredentials: true,
            });
            if (result.data.status === true) {
                set({ doctorList: result.data.data });
            }
        } catch (err) {
            unauthorized(err?.response?.status);
            throw err;
        }
    },

    // Fetch doctors by specialty (e.g., for filters or homepage)
    fetchDoctorListBySpeciality: async (specialityID) => {
        try {
            const result = await axios.get(
                `${base_url}/fetch-doctors-by-specialty/${specialityID}?status=approved`
            );
            if (result.data.status === true) {
                set({ doctorList: result.data.data });
            }
        } catch (err) {
            unauthorized(err?.response?.status);
            throw err;
        }
    },

    // Search doctors by keyword with query params
    fetchDoctorListByKeyword: async (searchParams) => {
        try {
            const queryString = new URLSearchParams(searchParams).toString();
            const result = await axios.get(
                `${base_url}/search-doctor?${queryString}&status=approved`
            );
            if (result.data.status === true) {
                set({ doctorList: result.data.data });
            }
        } catch (err) {
            unauthorized(err?.response?.status);
            throw err;
        }
    },

    // update doctor profile
    updateDoctorProfile: async (data) => {
        try {
            const result = await axios.put(`${base_url}/update-doctor-profile`, data, {
                withCredentials: true,
            });
            return result.data;
        } catch (err) {
            unauthorized(err?.response?.status);
            throw err;
        }
    },

    // Update doctor verification status (admin only)
    updateDoctorStatus: async (doctorID, data) => {
        try {
            const result = await axios.put(
                `${base_url}/verify-doctor-request/${doctorID}`,
                data,
                { withCredentials: true }
            );
            return result.data;
        } catch (err) {
            unauthorized(err?.response?.status);
            throw err;
        }
    },

    // Delete doctor by admin
    deleteDoctorByAdmin: async (doctorID) => {
        try {
            const result = await axios.delete(
                `${base_url}/delete-doctor/${doctorID}`,
                { withCredentials: true }
            );
            return result.data;
        } catch (err) {
            unauthorized(err?.response?.status);
            throw err;
        }
    },
}));
