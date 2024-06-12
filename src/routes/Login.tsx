import { useState, useEffect } from 'react';
import { LoginInput } from '../components/LoginInput';
import { RegisterInput } from '../components/RegisterInput';
import MyButton from '../components/MyButton';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';

export function Login(){
    const [login, setLogin] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/wish/home');
        }
    }, [navigate]);

    return (
        <section>
            <div>
                <MyButton variant="contained" onClick={() => setLogin(true)}>
                    Login
                </MyButton >
                <MyButton variant="contained" onClick={() => setLogin(false)}>
                    Register
                </MyButton >
            </div>
            { login ? <LoginInput /> : <RegisterInput />}
            
            
        </section>
    );
}