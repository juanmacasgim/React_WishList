import { useState, SetStateAction } from 'react';
import { WishInterface } from '../interfaces/WishInterface';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

//Componente que se encarga de mostrar una nota
export function WishItem({ wish, onEditWish, onDeleteWish }: { wish: WishInterface, onEditWish: (wish: WishInterface) => void, onDeleteWish: (wish: WishInterface) => void }) {
    const navigate = useNavigate();

    //Función que se encarga de editar la nota
    const handleEdit = () => {
        console.log("Editando");
        navigate(`/wish/update/${wish.id}`);
    }

    //Función que se encarga de borrar la nota
    const handleDelete = () => {
        console.log("Borrando");
        onDeleteWish(wish);
    }

    //Renderiza el componente
    return (
        <section className="WishItem">
            <>
                <div className="wish-item">
                    <label className="wish-type">{wish.type}</label>
                    <label className="wish-date">{"Creado el: " + wish.date.toLocaleString()}</label>
                </div>
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
                        <IconButton onClick={handleEdit} aria-label="edit">
                            <EditIcon  />
                        </IconButton>
                        <IconButton onClick={handleDelete} aria-label="delete">
                            <DeleteIcon  />
                        </IconButton>
                    </div>
                </div>
            </>
        </section>
    );
}