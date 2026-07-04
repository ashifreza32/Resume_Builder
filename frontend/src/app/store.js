import {configureStore} from "@reduxjs/toolkit";
import oReducer from './features/oSlice';

export const store = configureStore({
    reducer: {
        o: oReducer, 
    }
});