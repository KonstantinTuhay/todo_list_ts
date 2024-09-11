import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./slices/taskSlice";
import tasksReducer from "./reducers/taskReducer";
import editSlices from "./slices/editSlices";
import editReducer from "./reducers/editReducer";
import previousEditReducer from "./reducers/previousEditReducer";
import previousEditSlice from "./slices/previousEditSlice";
import addSlice from "./slices/addSlice";
import addReducer from "./reducers/addReducer";
import { toDoApi } from "../../apiRQuery";

export const store = configureStore({
  reducer: {
    addReducer: addReducer,
    addSlice: addSlice,
    previousEditSlice: previousEditSlice,
    previousEditReducer: previousEditReducer,
    editWithSlice: editSlices,
    editReducer: editReducer,
    tasksSlice: tasksSlice,
    tasksReducer: tasksReducer,
    [toDoApi.reducerPath]: toDoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(toDoApi.middleware),
});
