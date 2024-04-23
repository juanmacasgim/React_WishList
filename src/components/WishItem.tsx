import { useState } from 'react';
import { WishInterface } from '../interfaces/WishInterface';

//Componente que se encarga de mostrar una nota
export function WishItem({ wish, onEditWish, onDeleteWish }: { wish: WishInterface, onEditWish: (wish: WishInterface) => void, onDeleteWish: (wish: WishInterface) => void }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(wish.text);

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleSave = () => {
        onEditWish({ ...wish, text: editedText });
        setIsEditing(false);
    }

    const handleDelete = () => {
        console.log("Borrando");
        console.log(wish);
        onDeleteWish(wish);
    }

    return (
        <section>
            {isEditing ? (
                <>
                    <input type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)} />
                    <button onClick={handleSave}>Save</button>
                </>
            ) : (
                <>
                    <div>
                        <label>{wish.text}</label>
                        <label onClick={handleEdit}>📝</label>
                        <label onClick={handleDelete}>🗑️</label>
                        <br></br>
                        <label>{wish.date}</label>
                    </div>
                </>
            )}
        </section>
    );
}