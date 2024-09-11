import { createSlice } from "@reduxjs/toolkit";

const addSlice = createSlice({
  name: "tasks",
  initialState: "",
  reducers: {
    addTaskInput: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { addTaskInput } = addSlice.actions;
export default addSlice.reducer;
