import { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { WishInterface } from '../interfaces/WishInterface';
import { WishInput } from '../components/WishInput';
import { createWish, deleteWish } from '../api/services';
import Snackbar from '@mui/material/Snackbar';

export function AddWish() {
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleAddWish = async (newWish: WishInterface) => {
        try {
            const response = await createWish(newWish);
            console.log(response);
            if (response.success) {
                setMessage('Deseo actualizado correctamente');
                setOpen(true);
                setTimeout(() => navigate('/wish/home'), 500);
            }
        } catch (error) {
            console.error('Error updating wish:', error);
        }
    }

    const handleDeleteWish = async (id: any) => {
        try {
            await deleteWish(id);
            navigate('/wish/home');
        } catch (error) {
            console.error('Error deleting wish:', error);
        }
    }

    return (
        <>
            <WishInput addorupdateWish={handleAddWish} deleteWish={handleDeleteWish} />
            <Snackbar
                open={open}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                onClose={() => setOpen(false)}
                message={message}
            />
        </>
    );
}