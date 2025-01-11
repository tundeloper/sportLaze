import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { SportlazeContext } from '../store/context';

const MUISnackbar: React.FC = () => {
    const ctx = React.useContext(SportlazeContext)
    return  <Snackbar
    open={!(ctx?.loading)}
    autoHideDuration={4000}
    anchorOrigin={{horizontal: 'center',vertical: 'top' }}
    // onClose={handleClose}
    message={ctx?.errorMesssage}
    // action={action}
  />
}

export default MUISnackbar