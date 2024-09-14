import { createAction, createReducer } from "@reduxjs/toolkit";

export const addTaskInput = createAction("task2/editTask");

const initialState = "";

const addReducer = createReducer(initialState, (builder) => {
  builder.addCase(addTaskInput, (state, action) => {
    return (state = action.payload);
  });
});

export default addReducer;
