import { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate, useParams } from 'react-router-dom';
import { WishInterface } from '../interfaces/WishInterface';
import { WishInput } from '../components/WishInput';
import { getWishById, updateWish, deleteWish } from '../api/services';

export function UpdateWish() {
    const { wishId } = useParams();
    const wishIdNumber = Number(wishId);
    const [wish, setWish] = useState<WishInterface | null>(null);
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
            await updateWish(editedWish.id, editedWish);
            navigate('/wish/home');
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
        </>
    );
}