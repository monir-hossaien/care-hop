
import {create} from "zustand"
import axios from "axios";
const base_url = "https://bdapi.editboxpro.com/api"

export const commonStore = create((set)=>({

    loading: false,
    setLoading: (value)=>{
        set({loading: value})
    },

    searchParams: {
        division: '',
        district: '',
        post: '',
        name: '',
        specialityID: '',
        area: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    },
    inputOnChange: (name, value)=>{
        set((state)=>({
            searchParams: {
                ...state.searchParams,
                [name]: value
            }
        }))
    },

    resetSearchParams: () => set({
        searchParams: {
            division: '',
            district: '',
            post: '',
            name: '',
            specialityID: '',
            area: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        }
    }),

    divisionList: null,
    fetchDivisionList: async ()=>{
        let result = await axios.get(`${base_url}/divisions`)
        const data = result.data
        set({divisionList: data})
    },

    districtList: null,
    fetchDistrictList: async (division_name)=>{
        let result = await axios.get(`${base_url}/districts/${division_name}`)
        const data = result.data
        set({districtList: data})
    },

    postList: null,
    fetchPostList: async (district_name)=>{
        let result = await axios.get(`${base_url}/upazilas/${district_name}`)
        const data = result.data
        set({postList: data})
    },

}))