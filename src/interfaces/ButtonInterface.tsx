/*
* Interfaz de las propiedades del componente
*/
export interface ButtonInterface {
    variant: 'text' | 'outlined' | 'contained';
    onClick: () => void;
    endIcon?: React.ReactNode;
    children: React.ReactNode;
}