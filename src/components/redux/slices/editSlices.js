import { createSlice } from "@reduxjs/toolkit";

const editSlices = createSlice({
  name: "tasks",
  initialState: null,
  reducers: {
    editTask: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { editTask } = editSlices.actions;
export default editSlices.reducer;
