import { Box, Modal, Typography } from "@mui/material";
import { ReactNode} from "react";


interface Iprops{
IsOpen:boolean;
handleClose:()=>void;
title?:string;
description?: string;
children:ReactNode;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const MainModal=({IsOpen,handleClose,title,description,children}:Iprops) =>{

    return (
        <Modal
        open={IsOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box
        sx={style}
      >
        <Typography variant="h6" component="h2" sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'black' }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.7)', marginTop: '16px' }}>
          {description}
        </Typography>
        {children}
      </Box>
      </Modal>
    )
}
export default MainModal;