import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: null = null;

const editSlices = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    editTask: (state, action: PayloadAction<null>) => {
      return (state = action.payload);
    },
  },
});

export const { editTask } = editSlices.actions;
export default editSlices.reducer;
