import { useState, SetStateAction } from 'react';
import { WishInterface } from '../interfaces/WishInterface';

//Propiedades que recibe el componente
export interface WishInputProps {
    addWish: (wish: WishInterface) => void;
}

//Componente que se encarga de añadir una nueva nota
export function WishInput({ addWish }: WishInputProps) {
    //Controla el texto que se introduce en los inputs title y text
    const [inputTitle, setInputTitle] = useState('');
    const [inputText, setInputText] = useState('');

    //Función que se encarga de añadir una nueva nota cuando se pulsa la tecla Enter
    const enterWish = (event: { key: string; }) => {
        if (event.key === 'Enter' && inputText.trim() !== '') {
            const currentDate = new Date();
            const dateTimeString = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
            // Añade una nueva nota
            addWish({
                id: 0,
                title: inputTitle,
                text: inputText,
                isCompleted: false,
                date: dateTimeString
            });

            // Resetea los inputs title y text
            setInputTitle('');
            setInputText('');
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