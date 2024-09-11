import { createAction, createReducer } from "@reduxjs/toolkit";

export const editTask = createAction("task2/editTask");

const initialState = null;

const editReducer = createReducer(initialState, (builder) => {
  builder.addCase(editTask, (state, action) => {
    return (state = action.payload);
  });
});

export default editReducer;
