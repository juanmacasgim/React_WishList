import { useState, useEffect } from 'react';
import './App.css';
import { WishInterface } from './interfaces/WishInterface';
import { WishInput } from './components/WishInput';
import { WishList } from './components/WishList';
import { exportCSV, /* importCSV */ } from './logic/storage';
import { getAllUserWishes, updateWish, deleteWish } from './api/services';
import SaveIcon from '@mui/icons-material/Save';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import MyButton from './components/MyButton';
import { Navbar } from './components/Navbar';
import Snackbar from '@mui/material/Snackbar';


export function App() {
    //Lista de deseos
    const [wishes, setWishes] = useState<WishInterface[]>([]);
    //Ordenar deseos por fecha
    const [sortByDateAsc, setSortByDateAsc] = useState(true);
    //Texto de búsqueda
    const [searchText, setSearchText] = useState('');
    //Lista de deseos filtrada por texto de búsqueda, filtra tanto el título como el texto
    const filteredWishes = wishes.filter(wish => wish.text.toLowerCase().includes(searchText.toLowerCase()) ||
        wish.title.toLowerCase().includes(searchText.toLowerCase()));
    const [open, setOpen] = useState(false);

    //Carga la lista de deseos al iniciar la aplicación
    useEffect(() => {
        const fetchWishes = async () => {
            try {
                const wishList = await getAllUserWishes();
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
            setOpen(true);
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

    //Función para convertir una fecha de String a un objeto Date
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
            <div className="container">
                <input
                    className='input-text flex-item'
                    type="text"
                    placeholder="Buscar deseos..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <MyButton variant="contained" onClick={handleSortByDate} endIcon={<ImportExportIcon />}>
                    Sort by Date
                </MyButton >
                <MyButton variant="contained" onClick={() => exportCSV({ wishList: wishes })} endIcon={<SaveIcon />} >
                    Save CSV
                </MyButton >
            </div>
            <WishList wishes={filteredWishes} onEditWish={handleEditWish} onDeleteWish={handleDeleteWish} />
            <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    onClose={() => setOpen(false)}
                    message="Nota eliminada correctamente"
            />
        </div>
    );
}