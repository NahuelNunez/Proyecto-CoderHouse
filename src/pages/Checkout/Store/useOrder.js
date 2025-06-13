import axios from "axios"
import { create } from "zustand"

const baseURL = import.meta.env.VITE_API_URL


export const useOrder = create(() => ({

    orderPost: async (data) => {
        try {
            const response = await axios.post(`${baseURL}/order/create`, data, {
                withCredentials: true
            })
            return { data: response.data, error: null }

        } catch (error) {
            console.log("Error al genera la orden", error)
            return { error: error, data: null }



        }

    },

    getOrder: async () => {
        try {

            const response = await axios.get(`${baseURL}/order/getall`, {
                withCredentials: true

            })
            return { data: response.data, error: null }
        } catch (error) {
            console.log("Error al obtener las ordenes", error)
            return { error: error, data: null }
        }
    },

    getOrderBySessionId: async (id, sessionId) => {
        try {
            const response = await axios.get(`${baseURL}/order/sessionId/${id}/${sessionId}`, {
                withCredentials: true,

            })
            return { data: response.data, error: null }

        } catch (error) {
            console.log("Error al obtener las ordenes", error)
            return { error: error, data: null }

        }
    }





}))
