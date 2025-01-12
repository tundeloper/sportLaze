import * as React from 'react';
// import Snackbar from '@mui/material/Snackbar';
import { SportlazeContext } from '../store/context';

setTimeout(() => {

})

const MUISnackbar: React.FC = () => {
    const ctx = React.useContext(SportlazeContext)
    return  <div className={`p-3 ${ctx?.disMesssage.error ? 'bg-primary' : 'bg-secondary'} rounded-xl absolute top-2 .sliding-component ${ctx?.snacksisOpen ? 'show-snack' : 'hide-snack'}`}>{ctx?.disMesssage.message}</div>
}

export default MUISnackbar