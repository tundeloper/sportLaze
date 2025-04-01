import * as React from "react";
// import Snackbar from '@mui/material/Snackbar';
import { SportlazeContext } from "../store/context";
import { useSportlaze } from "../hooks/useContext";

setTimeout(() => {});

const MUISnackbar: React.FC = () => {
  let {disMesssage, snacksisOpen} = useSportlaze()
  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 ${
        disMesssage.error ? "bg-primary" : "bg-secondary"
      } rounded-xl absolute top-2 .sliding-component ${
        snacksisOpen ? "show-snack" : "hide-snack"
      }`}
      style={{ zIndex: "1000", position: 'fixed' }}
    >
      {disMesssage.message}
    </div>
  );
};

export default MUISnackbar;
