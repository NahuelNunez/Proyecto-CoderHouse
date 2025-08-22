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
            const msg = error.response?.data?.message || error.response?.data?.error
            return { error: msg, data: null }

        }
    },
    getUser: async () => {
        try {
            const response = await axios.get(`${baseURL}/user/getall`, {
                withCredentials: true
            })
            return { data: response.data, error: null }
        } catch (error) {
            console.log("Error al mostrar usuarios", error)
            return { error: error, data: null }
        }
    },
    editUser: async (id, token, data) => {
        try {
            const response = await axios.patch(`${baseURL}/user/edit/${id}`, data, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return { data: response.data, error: null }
        } catch (error) {
            console.log("Error al editar el usuario", error)
            return { error: error, data: null }
        }



    },

    inhabilitarAdmin: async (id, token) => {

        try {
            const response = await axios.patch(`${baseURL}/user/inhabilitarAdmin/${id}`, {}, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return { data: response.data, error: null }

        } catch (error) {
            console.log("Error al inhabilitar el administador", error)
            return { error: error, data: null }

        }

    },
    habilitarAdmin: async (id, token) => {
        try {
            const response = await axios.patch(`${baseURL}/user/habilitarAdmin/${id}`, {}, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }

            })
            return { data: response.data, error: null }
        } catch (error) {
            console.log("Error al habilitar el administrador", error)
            return { error: error, data: null }

        }
    },


    deleteUser: async (id, token) => {
        try {
            const response = await axios.patch(`${baseURL}/user/delete/${id}`, {}, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return { data: response.data, error: null }
        } catch (error) {
            console.log("Error al eliminar el usuario", error)
            const msg = error.response?.data?.message || error.response?.data?.error
            return { error: msg, data: null }
        }
    }


}))
