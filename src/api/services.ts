import axios from 'axios';
import { WishInterface } from '../interfaces/WishInterface';

/**
 * API URL
 * Conexion con la API de Laravel
 */
const API_URL = 'http://127.0.0.1:8000/api';

/**
 * Devuelve todas los deseos 
 */
export const getAllWishes = async () => {
    const response = await axios.get<WishInterface[]>(`${API_URL}/wishes`);
    return response.data;
};

/**
 * Devuelve un deseo por su ID
 */
export const getWishById = async (id: number) => {
    const response = await axios.get<WishInterface>(`${API_URL}/wishes/${id}`);
    return response.data;
};

/**
 * Crea un nuevo deseo
 */
export const createWish = async (wish: WishInterface) => {
    const response = await axios.post<{ success: boolean; data: WishInterface }>(`${API_URL}/wishes`, {
        id : wish.id,
        title: wish.title,
        text: wish.text,
        type: wish.type,
        isCompleted: wish.isCompleted,
        date : wish.date
    });
    return response.data;
};

/**
 * Actualiza un deseo
 */
export const updateWish = async (id: number, wish: WishInterface) => {
    const response = await axios.put<{ success: boolean; data: WishInterface }>(`${API_URL}/wishes/${id}`, {
        id : wish.id,
        title: wish.title,
        text: wish.text,
        type: wish.type,
        isCompleted: wish.isCompleted,
        date : wish.date
    });
    return response.data;
};

/**
 * Elimina un deseo
 */
export const deleteWish = async (id: number) => {
    const response = await axios.delete<{ success: boolean; data: WishInterface }>(`${API_URL}/wishes/${id}`);
    return response.data;
};