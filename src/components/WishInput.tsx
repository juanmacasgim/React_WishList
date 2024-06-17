import React, { useEffect, useState, SetStateAction } from 'react';
import { WishInterface } from '../interfaces/WishInterface';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import MyButton from '../components/MyButton';
import Snackbar from '@mui/material/Snackbar';

//Propiedades que recibe el componente
export interface WishInputProps {
    addorupdateWish: (wish: WishInterface) => void;
    deleteWish: (id: number) => void;
    wish?: WishInterface | null;
}

//Componente que se encarga de añadir una nueva nota
export function WishInput({ addorupdateWish, deleteWish, wish }: WishInputProps) {
    //Controla el texto que se introduce en los inputs title y text
    const [inputTitle, setInputTitle] = useState('');
    const [inputText, setInputText] = useState('');
    const [inputType, setInputType] = useState('Comida');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (wish) {
            setInputTitle(wish.title);
            setInputText(wish.text);
            setInputType(wish.type);
        }
    }, [wish]);

    const addOrUpdateWish = () => {
        if (inputText.trim() === '' || inputTitle.trim() === '') {
            setOpen(true);
        } else {
            const currentDate = new Date();
            const dateTimeString = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
            addorupdateWish({
                id: wish ? wish.id : 0,
                title: inputTitle,
                text: inputText,
                type: inputType,
                isCompleted: false,
                date: dateTimeString,
                user_id: wish ? wish.user_id : 0
            });
        }

    }

    const handleSave = () => {
        addOrUpdateWish();
    }

    const handleDelete = () => {
        if (wish) {
            deleteWish(wish.id);
        }
    }

    //Función que se encarga de controlar el texto que se introduce en los inputs title y text
    const handleInputTitleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setInputTitle(event.target.value);
    }
    const handleInputTextChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setInputText(event.target.value);
    }

    //Renderiza el componente
    return (
        <section>
            <div className='divinput'>
                <div className='divborder'>
                    <h1>Introduce tu nota</h1>
                    <input
                        className='input-text'
                        type="text"
                        placeholder="Introduce el título de tu nota"
                        onChange={handleInputTitleChange}
                        value={inputTitle}
                    />
                    <textarea
                        className='input-text'
                        placeholder="Introduce la descripcion"
                        onChange={handleInputTextChange}
                        value={inputText}
                    />
                    <select
                        className='input-text'
                        value={inputType}
                        onChange={(e) => setInputType(e.target.value)}
                    >
                        <option value="Comida">Comida</option>
                        <option value="Viaje">Viaje</option>
                        <option value="Tarea">Tarea</option>
                        <option value="Compra">Compra</option>
                        <option value="Evento">Evento</option>
                        <option value="Cita">Cita</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>
                <div>
                    <MyButton variant="contained" onClick={handleSave} endIcon={<SendIcon />}>
                        {wish ? 'Actualizar' : 'Añadir'}
                    </MyButton >
                    {wish && (
                        <MyButton variant="contained" onClick={handleDelete} endIcon={<DeleteIcon />}>
                            Eliminar
                        </MyButton >
                    )}
                </div>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    onClose={() => setOpen(false)}
                    message="No se puede guardar una nota sin título o descripción"
                />
            </div>
        </section>
    );
}