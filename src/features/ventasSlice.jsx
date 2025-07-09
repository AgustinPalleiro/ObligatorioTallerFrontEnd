import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ventas: [],
}


export const ventasSlice = createSlice({
    name:"venta",
    initialState,
    reducers:{
        cargarVentas:(state, action) =>{
            state.ventas = action.payload;
        },
        agregarVenta:(state, action) => {
            state.ventas.push(action.payload)
        }
    }
})


export const { cargarVentas, agregarVenta } = ventasSlice.actions

export default ventasSlice.reducer;