import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import { ButtonInterface } from '../interfaces/ButtonInterface';

/**
 * Estilos personalizados del botón de Material-UI
 */
const StyledButton  = styled(Button)({
    textTransform: 'none',
    border: '2px solid #333',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: 'darkgrey',
    color: 'rgb(11, 11, 11)',
    width: '150px',
    height: '42px',
    margin: '10px',
    cursor: 'pointer',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: '#999494',
    },
});

const MyButton: React.FC<ButtonInterface> = ({ variant, onClick, children, endIcon }) => {
    return (
        <StyledButton variant={variant} onClick={onClick} endIcon={endIcon}>
            {children}
        </StyledButton>
    );
}

export default MyButton;