import axios from "axios"
import { create } from "zustand"
const baseURL = import.meta.env.VITE_API_URL
export const usePayment = create((set) => ({

    createPayments: async (data) => {
        try {
            const response = await axios.post(`${baseURL}/payment/create`, data, {
                withCredentials: true
            })
            return { data: response.data, error: null }

        } catch (error) {
            console.log("Error al acceder al pago")
            return { error: error, data: null }
        }
    }

}))

