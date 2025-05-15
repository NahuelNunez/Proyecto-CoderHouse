import { create } from "zustand";
import axios from 'axios'
const baseURL = import.meta.env.VITE_API_URL
export const useUser = create((set) => ({

    postSingUp: async (data) => {
        try {
            const response = await axios.post(`${baseURL}/user/create`, data, {
                withCredentials: true,

            })
            return { data: response.data, error: null }
        } catch (error) {
            console.log('Error al registrarse', error)
            return { error: error, data: null }

        }
    }


}))
