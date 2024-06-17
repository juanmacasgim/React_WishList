import { useState, useEffect } from 'react';
import MyButton from './MyButton';
import LoginIcon from '@mui/icons-material/Login';
import Snackbar from '@mui/material/Snackbar';
import { register } from '../api/services'
import { UserInterface } from '../interfaces/UserInterface';
import { useNavigate } from 'react-router-dom';

export function RegisterInput() {
    const user: UserInterface = { name: '', email: '', password: '' };
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputPassword2, setInputPassword2] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const enterLogin = (event: { key: string; }) => {
        if (event.key === 'Enter') {
            handleRegister();
        }
    }

    const handleInputNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputName(event.target.value);
    }

    const handleInputEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputEmail(event.target.value);
    }

    const handleInputPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputPassword(event.target.value);
    }

    const handleInputPasswordChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputPassword2(event.target.value);
    }

    const handleRegister = async () => {
        if (inputName.trim() === '' || inputEmail.trim() === '' || inputPassword.trim() === '' || inputPassword2.trim() === '') {
            setMessage('Faltan datos por introducir');
            setOpen(true);
        } else {
            if (inputPassword === inputPassword2) {
                user.name = inputName;
                user.email = inputEmail;
                user.password = inputPassword;

                const response = await register(user);

                if (response.status === 1) {
                    setMessage('Usuario registrado correctamente');
                    setOpen(true);
                    setTimeout(() => navigate('/wish/home'), 500);
                } else if (response.status === 0) {
                    setMessage('El correo ya está registrado');
                    setOpen(true);
                } else {
                    setMessage('Algo salió mal, inténtalo de nuevo');
                    setOpen(true);
                }
            } else {
                setMessage('Las contraseñas no coinciden');
                setOpen(true);
            }
        }
    }

    return (
        <section>
            <div className='divinput'>
                <div className='divborder'>
                    <h1>Introduce tus datos</h1>
                    <input
                        className='input-text'
                        type="text"
                        placeholder="Introduce tu nombre"
                        onChange={handleInputNameChange}
                        onKeyUp={enterLogin}
                        value={inputName}
                    />
                    <input
                        className='input-text'
                        type="text"
                        placeholder="Introduce tu correo"
                        onChange={handleInputEmailChange}
                        onKeyUp={enterLogin}
                        value={inputEmail}
                    />
                    <input
                        className='input-text'
                        type="password"
                        placeholder="Introduce tu contraseña"
                        onChange={handleInputPasswordChange}
                        onKeyUp={enterLogin}
                        value={inputPassword}
                    />
                    <input
                        className='input-text'
                        type="password"
                        placeholder="Confirma tu contraseña"
                        onChange={handleInputPasswordChange2}
                        onKeyUp={enterLogin}
                        value={inputPassword2}
                    />
                </div>
                <div>
                    <MyButton variant="contained" onClick={handleRegister} endIcon={<LoginIcon />}>
                        Iniciar
                    </MyButton >
                </div>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    onClose={() => setOpen(false)}
                    message={message}
                />
            </div>
        </section>
    );
}