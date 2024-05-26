import axios from 'axios';
import { WishInterface } from '../interfaces/WishInterface';

const API_URL = 'http://127.0.0.1:8000/api';

export const getAllWishes = async () => {
    const response = await axios.get<WishInterface[]>(`${API_URL}/wishes`);
    return response.data;
};

export const createWish = async (wish: WishInterface) => {
    const response = await axios.post<{ success: boolean; data: WishInterface }>(`${API_URL}/wishes`, {
        id : wish.id,
        title: wish.title,
        text: wish.text,
        isCompleted: wish.isCompleted,
        date : wish.date
    });
    return response.data;
};

export const getWishById = async (id: number) => {
    const response = await axios.get<WishInterface>(`${API_URL}/wishes/${id}`);
    return response.data;
};

export const updateWish = async (id: number, wish: WishInterface) => {
    const response = await axios.put<{ success: boolean; data: WishInterface }>(`${API_URL}/wishes/${id}`, {
        id : wish.id,
        title: wish.title,
        text: wish.text,
        isCompleted: wish.isCompleted,
        date : wish.date
    });
    return response.data;
};

export const deleteWish = async (id: number) => {
    const response = await axios.delete<{ success: boolean; data: WishInterface }>(`${API_URL}/wishes/${id}`);
    return response.data;
};

function convertToDate(dateString: string) {
    // Divide la cadena en fecha y hora
    const [date, time] = dateString.split(' ');
    // Divide la fecha en día, mes y año
    const [day, month, year] = date.split('/');
    // Divide la hora en hora, minuto y segundo
    const [hour, minute, second] = time.split(':');

    // Los meses en TypeScript empiezan en 0, por lo que hay que restar 1 al mes
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute), parseInt(second));
}