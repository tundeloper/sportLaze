import { useContext } from "react";
import { SportlazeContext } from "../store/context";

export const useSportlaze = () => {
    const context = useContext(SportlazeContext);
    if (!context) {
        throw new Error('useSporlaze must be used within an SportlazeProvider');
    }
    return context;
};