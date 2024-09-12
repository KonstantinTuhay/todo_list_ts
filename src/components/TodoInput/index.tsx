import React, { useRef, useEffect, KeyboardEvent } from "react";
import { addTask } from "../redux/slices/taskSlice.js";
import { addTaskInput } from "../redux/slices/addSlice.js";
import { useCreateToDoMutation } from "../../apiRQuery.js";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import styles from "./index.module.css";

type ForTeach = {
  teachMeUseHoc: () => void;
};

const TodoForm = (props: ForTeach): JSX.Element => {
  const { teachMeUseHoc } = props;
  const [createTask] = useCreateToDoMutation();

  const dispatch = useAppDispatch();
  const add = useAppSelector((state) => state.addSlice);

  const handleChange = async (event: KeyboardEvent<HTMLInputElement>) => {
    const newTask = { title: add };
    if (event.key === "Enter") {
      console.log(typeof add);
      teachMeUseHoc();
      dispatch(addTask(add));
      await createTask(newTask);
      dispatch(addTaskInput(""));
    }
  };

  const focusOnAddInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    focusOnAddInput.current?.focus();
  }, []);

  return (
    <div className={styles.todoForm}>
      <input
        type="text"
        placeholder="Enter new todo"
        value={add}
        onChange={(event) => dispatch(addTaskInput(event.target.value))}
        onKeyDown={handleChange}
        ref={focusOnAddInput}
      />
    </div>
  );
};

export default TodoForm;
