import axios from 'axios'
import { create } from 'zustand'
const baseURL = import.meta.env.VITE_API_URL

export const useCategory = create((set) => ({
    categories: [],
    getCategory: async () => {
        try {
            const response = await axios.get(`${baseURL}/category/getAll`, {
                withCredentials: true
            })
            set({ categories: response.data })
            return { data: response.data, error: null }

        } catch (error) {
            console.log("Error al obtener las categorias", error)

            return { error: error, data: null }


        }
    },
    getCategorybyId: async (token, id) => {
        try {
            const response = await axios.get(`${baseURL}/category/getAll/${id}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return { data: response.data, error: null }

        } catch (error) {
            console.log("Error al obtener la categoria", error)
            return { error: error, data: null }

        }
    },
    postCategory: async (token, data) => {
        try {
            const response = await axios.post(`${baseURL}/category/create`, data, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return ({ data: response.data, error: null })
        } catch (error) {
            const msg = error.response?.data?.error || error.response?.data?.message
            console.log("Error al crear la categoria", error)
            return { error: msg, data: null }
        }
    },
    editCategory: async (token, id, data) => {
        try {
            const response = await axios.put(`${baseURL}/category/edit/${id}`, data, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return ({ data: response.data, error: null })
        } catch (error) {
            const msg = error.response?.data?.message || error.response?.data?.error
            console.log("Error al editar la categoria", error)
            return { error: msg, data: null }

        }
    },
    deleteCategory: async (id, token) => {
        try {
            const response = await axios.patch(`${baseURL}/category/delete/${id}`, {}, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return { data: response.data, error: null }
        } catch (error) {
            console.log("Error al eliminar la categoria", error)
            return { error: error, data: null }

        }
    },
    inhabilitarCategory: async (token, id) => {
        try {
            const response = await axios.patch(`${baseURL}/category/inhabilitar/${id}`, {}, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }

            })
            return { data: response.data, error: null }
        } catch (error) {
            const msg = error.response?.data?.error || error.response?.data?.message
            return { error: msg, data: null }

        }
    },
    habilitarCategory: async (token, id) => {
        try {
            const response = await axios.patch(`${baseURL}/category/habilitar/${id}`, {}, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` }

            })
            return { data: response.data, error: null }
        } catch (error) {
            const msg = error.response?.data?.error || error.response?.data?.message
            return { error: msg, data: null }

        }
    },


}))