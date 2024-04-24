import { useEffect } from 'react';
import { WishInterface } from '../interfaces/WishInterface';
import { WishItem } from './WishItem';

//Propiedades que recibe el componente
export interface WishListProps {
    wishes: WishInterface[];
    onEditWish: (wish: WishInterface) => void;
    onDeleteWish: (wish: WishInterface) => void;
}

//Componente que se encarga de añadir una nueva nota a la lista
export function WishList({ wishes, onEditWish, onDeleteWish }: WishListProps) {
    //Añade la nueva nota a la lista
    useEffect(() => {

    }, [wishes]);

    const editWish = (editedWish: WishInterface) => {
        onEditWish(editedWish);
    }

    //Elimina una nota
    const deleteWish = (deletedWish: WishInterface) => {
        onDeleteWish(deletedWish);
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