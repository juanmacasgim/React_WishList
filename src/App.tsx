import { useState, useEffect } from 'react';
import './App.css';
import { WishInterface } from './interfaces/WishInterface';
import { WishInput } from './components/WishInput';
import { WishList } from './components/WishList';
import { SaveList, LoadList } from './logic/storage';
import { getAllWishes, createWish, updateWish, deleteWish } from './api/services';


export function App() {
    //Lista de deseos
    const [wishes, setWishes] = useState<WishInterface[]>([]);
    //Ordenar deseos por fecha
    const [sortByDateAsc, setSortByDateAsc] = useState(true);
    //Texto de búsqueda
    const [searchText, setSearchText] = useState('');
    //Lista de deseos filtrada
    const filteredWishes = wishes.filter(wish => wish.text.toLowerCase().includes(searchText.toLowerCase()));

    //Carga la lista de deseos al iniciar la aplicación
    useEffect(() => {
        const fetchWishes = async () => {
            try {
                const wishList = await getAllWishes();
                setWishes(wishList);
            } catch (error) {
                console.error('Error loading wishes:', error);
            }
        };
        fetchWishes();
    }, []);

    //Guarda la lista de deseos al modificarla
    useEffect(() => {

    }, [wishes]);

    //Forzar la carga de la lista de deseos
    const forceLoad = () => {
        const wishList = LoadList();
        setWishes(wishList);
    }

    //Añade un nuevo deseo
    const handleAddWish = async (newWish: WishInterface) => {
        try {
            const createdWish = await createWish(newWish);
            setWishes([...wishes, createdWish.data]);
        } catch (error) {
            console.error('Error adding wish:', error);
        }
    }

    //Edita un deseo
    const handleEditWish = async (editedWish: WishInterface) => {
        try {
            const updatedWish = await updateWish(editedWish.id, editedWish);
            const newWishes = wishes.map(wish => (wish.id === editedWish.id ? updatedWish.data : wish));
            setWishes(newWishes);
        } catch (error) {
            console.error('Error updating wish:', error);
        }
    };

    //Elimina un deseo
    const handleDeleteWish = async (deletedWish: WishInterface) => {
        try {
            await deleteWish(deletedWish.id);
            const newWishes = wishes.filter(wish => wish.id !== deletedWish.id);
            setWishes(newWishes);
        } catch (error) {
            console.error('Error deleting wish:', error);
        }
    }

    //Ordena los deseos por fecha
    const handleSortByDate = () => {
        const sortedWishes = [...wishes].sort((wisha, wishb) => {
            // Convertir las fechas a objetos Date
            const dateA = convertToDate(wisha.date);
            const dateB = convertToDate(wishb.date);

            if (!sortByDateAsc) {
                // Comparar las fechas como fechas, no como cadenas
                return dateA.getTime() - dateB.getTime();
            } else {
                return dateB.getTime() - dateA.getTime();
            }
        });

        setWishes(sortedWishes);
        setSortByDateAsc(!sortByDateAsc);
    };

    // Función para convertir una fecha de String a un objeto Date
    function convertToDate(dateString: string) {
        // Divide la cadena en fecha y hora
        const [date, time] = dateString.split(' ');
        // Divide la fecha en día, mes y año
        const [day, month, year] = date.split('/');
        // Divide la hora en hora, minuto y segundo
        const [hour, minute, second] = time.split(':');

        // Los meses en TypeScript empiezan en 0, por lo que hay que restar 1 al mes
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute), parseInt(second));
    }

    return (
        <div>
            <button className='Button' onClick={() => SaveList({ wishList: wishes })}>Save</button>
            <button className='Button' onClick={() => forceLoad()}>Load</button>
            <input
                className='input-text'
                type="text"
                placeholder="Buscar deseos..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <button className='Button' onClick={handleSortByDate}>Sort by Date</button>
            <WishInput addWish={handleAddWish} />
            <WishList wishes={filteredWishes} onEditWish={handleEditWish} onDeleteWish={handleDeleteWish} />
        </div>
    );
}