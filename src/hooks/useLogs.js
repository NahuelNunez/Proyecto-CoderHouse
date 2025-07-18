import axios from "axios";
import { create } from "zustand"
const baseURL = import.meta.env.VITE_API_URL

export const useLogs = create((set) => ({

    getAllLogs: async (token) => {
        try {
            const response = await axios.get(`${baseURL}/logs/`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearear ${token}`
                }
            })
            return { data: response.data, error: null }

        } catch (error) {
            const msg = error.response?.data?.error || error.response?.data?.message

            console.log("Error al obtener los logs", error)
            return { error: msg, data: null }

        }
    }

}))

