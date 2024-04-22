import { useState, useEffect } from 'react';
import './App.css';
import { WishInterface } from './interfaces/WishInterface';
import { WishInput } from './components/WishInput';
import { WishItem } from './components/WishItem';
import { WishList } from './components/WishList';


export function App() {
    const [wish, setWish] = useState<WishInterface>();

    const handleAddWish = (newWish: WishInterface) => {
        setWish(newWish);
    }

    return (
        <div>
            <WishInput addWish={handleAddWish} />
            <WishList newWish={wish} />
        </div>
    );
}