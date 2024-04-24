import { useState, useEffect } from 'react';
import './App.css';
import { WishInterface } from './interfaces/WishInterface';
import { WishInput } from './components/WishInput';
import { WishList } from './components/WishList';
import { SaveList, LoadList } from './logic/storage';
import { Button } from 'react-bootstrap';


export function App() {
    const [wishes, setWishes] = useState<WishInterface[]>([]);

    useEffect(() => {
        const wishList = LoadList();
        setWishes(wishList);
    }, []);

    useEffect(() => {
        
    }, [wishes]);

    const handleAddWish = (newWish: WishInterface) => {
        setWishes([...wishes, newWish]);
    }

    const handleEditWish = (editedWish: WishInterface) => {
        const newWishes = wishes.map(wish => {
            if (wish.id === editedWish.id) {
                return editedWish;
            }
            return wish;
        });

        setWishes(newWishes);
    }

    const handleDeleteWish = (deletedWish: WishInterface) => {
        const newWishes = wishes.filter(wish => wish.id !== deletedWish.id);
        setWishes(newWishes);
    }

    return (
        <div>
            <WishInput addWish={handleAddWish} />
            <WishList wishes={wishes} onEditWish={handleEditWish} onDeleteWish={handleDeleteWish} />
            <Button onClick={() => SaveList({ wishList: wishes })}>Save</Button>
        </div>
    );
}