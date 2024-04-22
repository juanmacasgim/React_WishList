import { useState, useEffect } from 'react';
import { WishInterface } from '../interfaces/WishInterface';
import { WishItem } from './WishItem';

//Propiedades que recibe el componente
export interface WishListProps {
    newWish: WishInterface;
    onEditWish: (wish: WishInterface) => void;
    onDeleteWish: (wish: WishInterface) => void;
}

//Componente que se encarga de añadir una nueva nota a la lista
export function WishList({ newWish }: WishListProps) {
    //Controla las notas que se han añadido
    const [wishes, setWishes] = useState<WishInterface[]>([]);

    //Añade la nueva nota a la lista
    useEffect(() => {
        if (newWish) {
            setWishes(prevWishes => [...prevWishes, newWish]);
        }
    }, [newWish]);

    //Edita una nota
    const editWish = (editedWish: WishInterface) => {
        setWishes(prevWishes => prevWishes.map(wish => wish.id === editedWish.id ? editedWish : wish));
    }

    //Elimina una nota
    const deleteWish = (deletedWish: WishInterface) => {
        setWishes(prevWishes => prevWishes.filter(wish => wish.id !== deletedWish.id));
    }

    //Renderiza el componente
    return (
        <section>
            {wishes.map(wish => (
                <WishItem
                    key={wish.id}
                    wish={wish}
                    onEditWish={editWish}
                    onDeleteWish={deleteWish}
                />
            ))}
        </section>
    );
}