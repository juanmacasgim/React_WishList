export const SaveList = ({ wishList }: { wishList: any }) => {
    console.log("Guardando");
    window.localStorage.setItem('wishList', JSON.stringify(wishList));
}

export const LoadList = () => {
    const wishList = window.localStorage.getItem('wishList');
    return wishList ? JSON.parse(wishList) : [];
}