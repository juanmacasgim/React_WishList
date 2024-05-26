import { useState, SetStateAction } from 'react';
import { WishInterface } from '../interfaces/WishInterface';

//Componente que se encarga de mostrar una nota
export function WishItem({ wish, onEditWish, onDeleteWish }: { wish: WishInterface, onEditWish: (wish: WishInterface) => void, onDeleteWish: (wish: WishInterface) => void }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(wish.title);
    const [editedText, setEditedText] = useState(wish.text);
    const [editedCheck, setEditedCheck] = useState(wish.isCompleted);

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleSave = () => {
        onEditWish({ ...wish,title: editedTitle, text: editedText, isCompleted: editedCheck});
        setIsEditing(false);
    }

    const handleCheck = () => {
        setEditedCheck(!editedCheck);
        onEditWish({ ...wish, isCompleted: !wish.isCompleted });
    }

    const handleDelete = () => {
        console.log("Borrando");
        onDeleteWish(wish);
    }

    const handleInputChangeTitle = (event: { target: { value: SetStateAction<string>; }; }) => {
        setEditedTitle(event.target.value);
    }

    //Función que se encarga de controlar el texto que se introduce en el input
    const handleInputChangeText = (event: { target: { value: SetStateAction<string>; }; }) => {
        setEditedText(event.target.value);
    }

    return (
        <section className="WishItem">
            {isEditing ? (
                <>
                    <input type="title" onChange={handleInputChangeTitle} value={editedTitle} onClick={handleCheck} />
                    <input type="text" onChange={handleInputChangeText} value={editedText} onClick={handleCheck} />
                    <button onClick={handleSave}>Save</button>
                </>
            ) : (
                <>
                    <label className="wish-date">{wish.date.toLocaleString()}</label>
                    <div className="wish-content">
                        <div className="wish-text">
                            <label className="title">{wish.title}</label>
                            <br />
                            <label className="text">{wish.text}</label>
                        </div>
                    </div>
                    <div className='wish-editbuttons'>
                        <label className="completed">{wish.isCompleted ? 'Completado ' : 'No completado '}</label>
                        <div className="wish-buttons">
                            <input className='wish-button' type="checkbox" checked={wish.isCompleted} onChange={() => onEditWish({ ...wish, isCompleted: !wish.isCompleted })} />
                            <label className='wish-button' onClick={handleEdit}>📝</label>
                            <label className='wish-button' onClick={handleDelete}>🗑️</label>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}