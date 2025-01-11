import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const MUISnackbar: React.FC<{message: string, open: boolean}> = ({message, open}) => {
    return  <Snackbar
    open={open}
    autoHideDuration={6000}
    // onClose={handleClose}
    message={message}
    // action={action}
  />
}
