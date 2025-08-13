import axios from "axios";
import { create } from "zustand";
const baseURL = import.meta.env.VITE_API_URL


export const useProductos = create((set) => ({
    productos: [],
    editingProduct: null,
    getProductos: async () => {
        try {
            const response = await axios.get(`${baseURL}/products/getAll`, {
                withCredentials: true
            })
            set({ productos: response.data })
            return { data: response.data, error: null }
        } catch (error) {
            console.error('Error al obtener los productos', error)
            return { error: error, data: null }
        }
    },

    getById: async (id) => {
        try {
            const response = await axios.get(`${baseURL}/products/getAll/${id}`, {
                withCredentials: true,
            })
            return { data: response.data, error: null }
        } catch (error) {
            console.error('Error al obtener el producto', error)
            return { error: error, data: null }
        }
    },

    postProductos: async (data, token) => {
        try {
            const response = await axios.post(`${baseURL}/products/create`, data, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return { data: response.data, error: null }
        } catch (error) {
            console.log('Error al crear los productos', error)
            return { error: error, data: null }

        }
    },

    editProductos: async (id, data, token) => {
        try {
            const response = await axios.patch(`${baseURL}/products/edite/${id}`, data, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return { data: response.data, error: null }
        }
        catch (error) {
            console.log('Error al editar los productos', error)
            return { error: error, data: null }


        }
    },
    deleteProductos: async (id, token) => {
        try {
            const response = await axios.delete(`${baseURL}/products/delete/${id}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return { data: response.data, error: null }

        } catch (error) {
            console.log('Error al eliminar el producto', error)
            return { error: error, data: null }

        }
    },
    inhabilitarProductos: async (id, token) => {
        try {
            const response = await axios.patch(`${baseURL}/products/inhabilitarProduct/${id}`, {}, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }

            })
            return { data: response.data, error: null }

        } catch (error) {
            console.error("Error al inhabilitar el producto", error)
            const msg = error.response?.data?.message || error.response?.data?.error
            return { error: msg, data: null }

        }
    },


    habilitarProductos: async (id, token) => {
        try {
            const response = await axios.patch(`${baseURL}/products/habilitarProduct/${id}`, {}, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return { data: response.data, error: null }
        } catch (error) {
            console.error("Error al habilitar el producto", error)
            const msg = error.response?.data?.message || error.response?.data?.error
            return { error: msg, data: null }
        }
    },





    setEditingProduct: (producto) => set({ editingProduct: producto }),
    clearEditingProduct: () => set({ editingProduct: null }),


}))





