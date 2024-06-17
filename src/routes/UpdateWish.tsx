import { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate, useParams } from 'react-router-dom';
import { WishInterface } from '../interfaces/WishInterface';
import { WishInput } from '../components/WishInput';
import { getWishById, updateWish, deleteWish } from '../api/services';
import Snackbar from '@mui/material/Snackbar';

export function UpdateWish() {
    const { wishId } = useParams();
    const wishIdNumber = Number(wishId);
    const [wish, setWish] = useState<WishInterface | null>(null);
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getWishById(wishIdNumber).then(wishData => {
            setWish(wishData);
        }).catch(error => {
            if (error.response.status === 404) {
                navigate('/wish/add');
            }
        });
    }, [wishId]);

    const handleEditWish = async (editedWish: WishInterface) => {
        try {
            const response = await updateWish(editedWish.id, editedWish);
            console.log(response);
            if (response.success) {
                setMessage('Deseo actualizado correctamente');
                setOpen(true);
                setTimeout(() => navigate('/wish/home'), 500);
            }
        } catch (error) {
            console.error('Error updating wish:', error);
        }
    };

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
            <WishInput addorupdateWish={handleEditWish} wish={wish} deleteWish={handleDeleteWish} />
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