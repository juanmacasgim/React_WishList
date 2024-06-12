import { Link, useLocation } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/system';
import { logout } from "../api/services";
import { useNavigate } from "react-router-dom";

const StyledAppBar = styled(AppBar)({
    position: 'fixed',
    top: 0,
    width: '100%',
    height: '64px',
    backgroundColor: 'lightgrey',
    color: 'rgb(11, 11, 11)',
});

const StyledAddCircleOutlineIcon = styled(AddCircleOutlineIcon)({
    display: 'flex',
    top: 0,
    width: '64px',
    height: '64px',
    color: 'black',
    '&:hover': {
        color: '#2F2D2D',
    },
});

const StyledLogoutIcon = styled(LogoutIcon)({
    display: 'flex',
    top: 0,
    width: '64px',
    height: '64px',
    color: 'black',
    '&:hover': {
        color: '#2F2D2D',
    },
});

const StyledHomeIcon = styled(HomeIcon)({
    display: 'flex',
    top: 0,
    width: '64px',
    height: '64px',
    color: 'black',
    '&:hover': {
        color: '#2F2D2D',
    },
});

//Componente que se encarga de añadir una nueva nota
export function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/wish/login');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <StyledAppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" className="navbar-container">
                        <div className="navbar-title">
                            {location.pathname === "/wish/home" && "Lista de deseos"}
                            {location.pathname === "/wish/add" && "Añadir deseo"}
                            {location.pathname === "/wish/login" && "Iniciar sesión"}
                        </div>
                        <div className="navbar-icons">
                            {location.pathname !== "/wish"
                                && location.pathname !== "/wish/login"
                                && (
                                <Link className="btn btn-outline-primary" to="/wish/home">
                                    <StyledHomeIcon />
                                </Link>
                            )}
                            {location.pathname !== "/wish/add"
                                && location.pathname !== "/wish/login"
                                && (
                                <Link className="btn btn-outline-primary" to="/wish/add">
                                    <StyledAddCircleOutlineIcon />
                                </Link>
                            )}
                            {location.pathname !== "/wish/login" && (
                                <Link className="btn btn-outline-primary" to="/wish/home" onClick={handleLogout}>
                                    <StyledLogoutIcon />
                                </Link>
                            )}
                        </div>
                    </Typography>
                </Toolbar>
            </StyledAppBar>
        </Box >
    );
}