import { Alert, AlertColor, Collapse } from '@mui/material';

interface IProps {
    severity: AlertColor;
    variant: 'filled' | 'outlined';
    description:string;
    onClick:()=>void;
    open:boolean;

}

const AlertComp = ({ variant, severity,description,onClick,open}: IProps) => {
    return (
        <Collapse in={open}>
            <Alert
            sx={{ mb: 2 }}
            variant={variant} severity={severity} onClick={onClick}
            >
            {description}
            </Alert>
      </Collapse>
    );
};

export default AlertComp;
