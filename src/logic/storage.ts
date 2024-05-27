import Papa from 'papaparse';
import { createWish } from '../api/services';
import { WishInterface } from '../interfaces/WishInterface';

export const exportCSV = ({ wishList }: { wishList: any }) => {
    const csv = Papa.unparse(wishList);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'wishes.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

/* export const importCSV = (file: File, setWishes: (wishes: WishInterface[]) => void) => {
    Papa.parse(file, {
        complete: async (result) => {
            const importedWishes = result.data as WishInterface[];
            const newWishes: WishInterface[] = [];

            for (const wish of importedWishes) {
                try {
                    const createdWish = await createWish(wish);
                    newWishes.push(createdWish.data);
                } catch (error) {
                    console.error('Error adding wish:', error);
                }
            }

            setWishes((prevWishes: WishInterface[]) => [...prevWishes, ...newWishes]);
        },
        header: true,
    });
}; */