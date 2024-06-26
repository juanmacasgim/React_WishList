import axios from 'axios';
import { WishInterface } from '../interfaces/WishInterface';
import { UserInterface } from '../interfaces/UserInterface';

/**
 * API URL
 * Conexion con la API de Laravel
 */
const API_URL = 'http://127.0.0.1:8000/api';

/**
 * Registro de usuario
 */
export const register = async (user: UserInterface) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            name: user.name,
            email: user.email,
            password: user.password
        });

        if (response.data.status === 1) {
            localStorage.setItem('token', response.data.token);
        }

        return response.data;
    } catch (error: any) {
        // Si la respuesta está disponible, la devuelve
        if (error.response) {
            return error.response.data;
        }
        // Si no, lanza el error
        throw error;
    }
};

export const login = async (user: UserInterface) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email: user.email,
            password: user.password
        });

        if (response.data.status === 1) {
            localStorage.setItem('token', response.data.token);
        }

        return response.data;
    } catch (error: any) {
        // Si la respuesta está disponible, la devuelve
        if (error.response) {
            return error.response.data;
        }
        // Si no, lanza el error
        throw error;
    }
};

export const logout = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/logout`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.data.status === 1) {
            localStorage.removeItem('token');
        }

        return response.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        }
        throw error;
    }
};

/**
 * Devuelve todas los deseos de un usuario
 */
export const getAllUserWishes = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get<WishInterface[]>(`${API_URL}/wishes`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        }
        throw error;
    }
};

/**
 * Devuelve un deseo por su ID
 */
export const getWishById = async (id: number) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get<WishInterface>(`${API_URL}/wishes/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        }
        throw error;
    }
};

/**
 * Crea un nuevo deseo
 */
export const createWish = async (wish: WishInterface) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post<{ success: boolean; data: WishInterface }>(`${API_URL}/wishes`, {
            id: wish.id,
            title: wish.title,
            text: wish.text,
            type: wish.type,
            isCompleted: wish.isCompleted,
            date: wish.date,
            user_id: wish.user_id
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        }
        throw error;
    }
};

/**
 * Actualiza un deseo
 */
export const updateWish = async (id: number, wish: WishInterface) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put<{ success: boolean; data: WishInterface }>(`${API_URL}/wishes/${id}`, {
            id: wish.id,
            title: wish.title,
            text: wish.text,
            type: wish.type,
            isCompleted: wish.isCompleted,
            date: wish.date
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        }
        throw error;
    }
};

/**
 * Elimina un deseo
 */
export const deleteWish = async (id: number) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete<{ success: boolean; data: WishInterface }>(`${API_URL}/wishes/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        }
        throw error;
    }
};