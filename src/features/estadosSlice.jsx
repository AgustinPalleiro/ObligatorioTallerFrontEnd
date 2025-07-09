import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    estados: [],
}


export const estadosSlice = createSlice({
    name:"estado",
    initialState,
    reducers:{
        cargarEstados:(state, action) =>{
            state.estados = action.payload;
        }
    }
})


export const { cargarEstados } = estadosSlice.actions

export default estadosSlice.reducer;