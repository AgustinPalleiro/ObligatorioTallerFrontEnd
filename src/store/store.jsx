import { configureStore } from "@reduxjs/toolkit";
import spinnerReducer from "../features/spinnerSlice";
import consolasReducer from "../features/consolasSlice";
import estadosReducer from "../features/estadosSlice";
import juegosReducer from "../features/juegosSlice";
import ventasReducer from "../features/ventasSlice";

export const store = configureStore({
    reducer:{
        spinner: spinnerReducer,
        consola: consolasReducer,
        estado: estadosReducer,
        juego: juegosReducer,
        venta: ventasReducer,
    }
})