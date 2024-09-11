import React, { useRef, useEffect, KeyboardEvent } from "react";
import { addTask } from "../redux/slices/taskSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { addTaskInput } from "../redux/slices/addSlice.js";
import { useCreateToDoMutation } from "../../apiRQuery.js";
import styles from "./index.module.css";

const TodoForm: React.FC = ({ teachMeUseHoc }): JSX.Element => {
  const [createTask] = useCreateToDoMutation();

  const dispatch = useDispatch();
  const add = useSelector((state) => state.addSlice);

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
