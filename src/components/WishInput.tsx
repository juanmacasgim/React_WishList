import { useState, useEffect, SetStateAction } from 'react';
import { WishItem } from './WishItem';
import { WishInterface } from '../interfaces/WishInterface';

//Propiedades que recibe el componente
export interface WishInputProps {
    addWish: (wish: WishInterface) => void;
}

//Componente que se encarga de añadir una nueva nota
export function WishInput({ addWish }: WishInputProps) {
    //Controla el texto que se introduce en el input
    const [inputText, setInputText] = useState('');

    //Función que se encarga de añadir una nueva nota
    const enterWish = (event: { key: string; }) => {
        if (event.key === 'Enter' && inputText.trim() !== ''){
            //Añade una nueva nota
            addWish({
                id: Math.random().toString(),
                text: inputText,
                isCompleted: false,
                date: new Date().toLocaleDateString()
            });
            //Resetea el input
            setInputText('');
        }
    }

    //Función que se encarga de controlar el texto que se introduce en el input
    const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setInputText(event.target.value);
    }

    //Renderiza el componente
    return (
        <section>
            <input
                type="text"
                placeholder="Introduce tu nota"
                onChange={handleInputChange}
                onKeyUp={enterWish}
                value={inputText}
            />

        </section>
    );
}