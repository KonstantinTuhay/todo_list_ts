import { useRef, useEffect, KeyboardEvent } from "react";
import styles from "./index.module.css";
import { addTask } from "../redux/slices/taskSlice.ts";
import { addTaskInput } from "../redux/slices/addSlice.ts";
import { useCreateToDoMutation } from "../../apiRQuery.ts";
import { useAppDispatch, useAppSelector } from "../hooks/hooks.ts";

interface TodoInputProps {
  teachMeUseHoc: () => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ teachMeUseHoc }) => {
  const [createTask] = useCreateToDoMutation();

  const dispatch = useAppDispatch();
  const add = useAppSelector((state) => state.addSlice);

  const handleChange = async (event: KeyboardEvent<HTMLInputElement>) => {
    const newTask = { title: add };
    if (event.key === "Enter") {
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
        onKeyDown={(e) => handleChange(e)}
        ref={focusOnAddInput}
      />
    </div>
  );
};

export default TodoInput;