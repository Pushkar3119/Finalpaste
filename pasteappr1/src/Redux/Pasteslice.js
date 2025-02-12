import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pastes: localStorage.getItem("pastes") ? JSON.parse(localStorage.getItem("pastes")) : []
};

export const pasteslice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addtopaste: (state, action) => {
      state.pastes.push(action.payload);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
    },
    updatetopaste: (state, action) => {
      const index = state.pastes.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) {
        state.pastes[index] = action.payload;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
      }
    },
    deletepaste: (state, action) => {
      state.pastes = state.pastes.filter((p) => p._id !== action.payload);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
    }
  }
});

export const { addtopaste, updatetopaste, deletepaste } = pasteslice.actions;
export default pasteslice.reducer;
