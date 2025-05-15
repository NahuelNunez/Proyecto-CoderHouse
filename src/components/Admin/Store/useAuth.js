import { create } from 'zustand'
import axios from 'axios'
const baseURL = import.meta.env.VITE_API_URL

export const useAuth = create((set) => ({
    user: null,
    login: async (credentials) => {
        try {
            const response = await axios.post(`${baseURL}/auth/login`, credentials, {
                withCredentials: true,

            })

            const { message, token } = response.data

            if (token) {
                const userData = response.data
                const now = new Date()
                const tokenExpiration = new Date(now.getTime() + 2 * 60 * 60 * 1000)
                userData.tokenExpiration = tokenExpiration.toISOString();

                localStorage.setItem('user', JSON.stringify(userData));
                set({ user: userData })
                return { data: userData, error: null }

            } else {
                return { data: null, error: message };
            }

        } catch (error) {
            console.error('Error de aunteticacion:', error)
            return { data: null, error: 'Error de autenticacion' };
        }
    },
    logout: () => {
        localStorage.removeItem('user');
        set({ user: null })
    },
    loadUserFromLocalStorage: () => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            set({ user: JSON.parse(storedUser) })
        }
    }
})

) 