import { useState, useEffect } from 'react';
import MyButton from './MyButton';
import LoginIcon from '@mui/icons-material/Login';
import Snackbar from '@mui/material/Snackbar';
import { login } from '../api/services';
import { UserInterface } from '../interfaces/UserInterface';
import { useNavigate } from 'react-router-dom';

export function LoginInput() {
    const user: UserInterface = { name: '', email: '', password: '' };
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const enterLogin = (event: { key: string; }) => {
        if (event.key === 'Enter') {
            if (inputEmail.trim() !== '' && inputPassword.trim() !== '') {
                handleLogin();
            } else {
                setMessage('Faltan datos por introducir');
                setOpen(true);
            }
        }
    }

    const handleInputEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputEmail(event.target.value);
    }

    const handleInputPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputPassword(event.target.value);
    }

    const handleLogin = async () => {
        if (inputEmail.trim() === '' || inputPassword.trim() === '') {
            setMessage('Faltan datos por introducir');
            setOpen(true);
        } else {
            user.email = inputEmail;
            user.password = inputPassword;

            const response = await login(user);

            if (response.status === 1) {
                navigate('/wish/home');
                setMessage('Usuario registrado correctamente');
                setOpen(true);
            } else {
                setMessage('Algo salió mal, inténtalo de nuevo');
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
                </div>
                <div>
                    <MyButton variant="contained" onClick={handleLogin} endIcon={<LoginIcon />}>
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