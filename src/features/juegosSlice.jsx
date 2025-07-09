import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    juegos: [],
}


export const juegosSlice = createSlice({
    name:"juego",
    initialState,
    reducers:{
        cargarJuegos:(state, action) =>{
            state.juegos = action.payload;
        }
    }
})


export const { cargarJuegos } = juegosSlice.actions

export default juegosSlice.reducer;