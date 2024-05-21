import { useState, SetStateAction } from 'react';
import { WishInterface } from '../interfaces/WishInterface';

//Propiedades que recibe el componente
export interface WishInputProps {
    addWish: (wish: WishInterface) => void;
}

//Componente que se encarga de añadir una nueva nota
export function WishInput({ addWish }: WishInputProps) {
    //Controla el texto que se introduce en el input
    const [inputTitle, setInputTitle] = useState('');
    const [inputText, setInputText] = useState('');

    //Función que se encarga de añadir una nueva nota
    const enterWish = (event: { key: string; }) => {
        if (event.key === 'Enter' && inputText.trim() !== '') {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 1);
            const dateTimeString = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
            //Añade una nueva nota
            addWish({
                id: Math.random().toString(),
                title: inputTitle,
                text: inputText,
                isCompleted: false,
                date: dateTimeString
            });

            //Resetea el input
            setInputTitle('');
            setInputText('');
        }
    }

    //Función que se encarga de controlar el texto que se introduce en el input
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
                        onKeyUp={enterWish}
                        value={inputTitle}
                    />
                    <textarea
                        className='input-text'
                        placeholder="Introduce la descripcion"
                        onChange={handleInputTextChange}
                        onKeyUp={enterWish}
                        value={inputText}
                    />
                </div>
            </div>
        </section>
    );
}