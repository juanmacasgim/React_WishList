import { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { WishInterface } from '../interfaces/WishInterface';
import { WishInput } from '../components/WishInput';
import { createWish, deleteWish} from '../api/services';

export function AddWish(){
    const [isWishAdded, setIsWishAdded] = useState(false);
    const navigate = useNavigate();

    const handleAddWish = async (newWish: WishInterface) => {
        try {
            await createWish(newWish);
            setIsWishAdded(true);
        } catch (error) {
            console.error('Error adding wish:', error);
        }
    }

    const handleDeleteWish = async (id: any) => {
        try {
            await deleteWish(id);
            navigate('/wish');
        } catch (error) {
            console.error('Error deleting wish:', error);
        }
    }

    useEffect(() => {
        if (isWishAdded) {
            navigate('/wish');
        }
    }, [isWishAdded, navigate]);

    return <WishInput addorupdateWish={handleAddWish} deleteWish={handleDeleteWish} />;
}