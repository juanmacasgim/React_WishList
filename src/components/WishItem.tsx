import { useState } from 'react';
import { WishInterface } from '../interfaces/WishInterface';

//Componente que se encarga de mostrar una nota
export function WishItem({ wish, onEditWish, onDeleteWish }: { wish: WishInterface, onEditWish: (wish: WishInterface) => void, onDeleteWish: (wish: WishInterface) => void }) {
    //Controla si se está editando la nota
    const [isEditing, setIsEditing] = useState(false);
    //Controla el texto editado
    const [editedText, setEditedText] = useState(wish.text);

    //Cuando se pulsa en editar se activa el modo edición
    const handleEdit = () => {
        setIsEditing(true);
    }

    //Cuando se pulsa en guardar se guarda la nota editada
    const handleSave = () => {
        onEditWish({ ...wish, text: editedText });
        setIsEditing(false);
    }

    //Cuando se pulsa en eliminar se elimina la nota
    const handleDelete = () => {
        onDeleteWish(wish);
    }

    //Renderiza el componente
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