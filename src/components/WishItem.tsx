import { useState, SetStateAction } from 'react';
import { WishInterface } from '../interfaces/WishInterface';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import MyButton from './MyButton';

//Componente que se encarga de mostrar una nota
export function WishItem({ wish, onEditWish, onDeleteWish }: { wish: WishInterface, onEditWish: (wish: WishInterface) => void, onDeleteWish: (wish: WishInterface) => void }) {
    //Controla si se está editando la nota
    const [isEditing, setIsEditing] = useState(false);
    //Controla el texto que se introduce en los inputs title y text
    const [editedTitle, setEditedTitle] = useState(wish.title);
    const [editedText, setEditedText] = useState(wish.text);
    //Controla si la nota está completada
    const [editedCheck, setEditedCheck] = useState(wish.isCompleted);

    //Función que se encarga de editar la nota
    const handleEdit = () => {
        setIsEditing(true);
        setEditedCheck(wish.isCompleted);
    }

    //Función que se encarga de modificar la nota cuando se pulsa la tecla Enter
    const enterWish = (event: { key: string; }) => {
        if (event.key === 'Enter' && editedText.trim() !== '') {
            handleSave();
        }
    }

    //Función que se encarga de guardar la nota editada
    const handleSave = () => {
        console.log("Editado");
        onEditWish({ ...wish, title: editedTitle, text: editedText, isCompleted: editedCheck });
        setIsEditing(false);
    }

    //Función que se encarga de controlar si la nota está completada o no
    const handleCheck = () => {
        setEditedCheck(!editedCheck);
        onEditWish({ ...wish, isCompleted: !wish.isCompleted });
    }

    //Función que se encarga de borrar la nota
    const handleDelete = () => {
        console.log("Borrando");
        onDeleteWish(wish);
    }

    //Función que se encarga de controlar el texto que se introduce en el input
    const handleInputChangeTitle = (event: { target: { value: SetStateAction<string>; }; }) => {
        setEditedTitle(event.target.value);
        if (editedCheck) {
            setEditedCheck(false);
        }
    }

    //Función que se encarga de controlar el texto que se introduce en el input
    const handleInputChangeText = (event: { target: { value: SetStateAction<string>; }; }) => {
        setEditedText(event.target.value);
        if (editedCheck) {
            setEditedCheck(false);
        }
    }

    //Renderiza el componente
    return (
        <section className="WishItem">
            {isEditing ? (
                <>
                    <input
                        className='input-edit'
                        type="title"
                        onChange={handleInputChangeTitle}
                        value={editedTitle}
                        onClick={handleCheck}
                        onKeyUp={enterWish}
                    />
                    <textarea
                        className='input-edit'
                        onChange={handleInputChangeText}
                        value={editedText}
                        onClick={handleCheck}
                        onKeyUp={enterWish}
                    />
                    <br />
                    <MyButton variant="contained" onClick={handleSave} endIcon={<SendIcon />}>
                        Actualizar
                    </MyButton >
                </>
            ) : (
                <>
                    <label className="wish-date">{"Creado el: "+wish.date.toLocaleString()}</label>
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
                            <Checkbox
                                checked={wish.isCompleted}
                                onChange={() => onEditWish({ ...wish, isCompleted: !wish.isCompleted })}
                            />
                            <IconButton aria-label="edit">
                                <EditIcon onClick={handleEdit} />
                            </IconButton>
                            <IconButton aria-label="delete">
                                <DeleteIcon onClick={handleDelete} />
                            </IconButton>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}