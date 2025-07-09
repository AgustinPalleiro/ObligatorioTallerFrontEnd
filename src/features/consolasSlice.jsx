import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    consolas: [],
}


export const consolasSlice = createSlice({
    name:"consola",
    initialState,
    reducers:{
        cargarConsolas:(state, action) =>{
            state.consolas = action.payload;
        }
    }
})


export const { cargarConsolas } = consolasSlice.actions

export default consolasSlice.reducer;