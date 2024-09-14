import { JSX } from "react";
import styles from "./index.module.css";
import withLogger from "../../helpers/withLogger";
import DeleteTodoLogger from "../DeleteTodoLogger";
import { RiAppleLine } from "react-icons/ri";
import { MdDoneOutline } from "react-icons/md";
import EditTodoLogger from "../EditTodoLogger";
import { CiEdit } from "react-icons/ci";
import { editTask } from "../redux/slices/editSlices";
import { previousEditTask } from "../redux/slices/previousEditSlice";
import { useIsCompletedTaskMutation } from "../../apiRQuery";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

type OneTodo = {
  todo: {
    id: string;
    title: string;
    user_id: number;
    isCompleted: boolean;
  };
};


const Todo = ({ todo }: OneTodo): JSX.Element => {
  const DeleteLogging = withLogger(DeleteTodoLogger);
  const EditLogging = withLogger(EditTodoLogger);
  const [isCompletedTask] = useIsCompletedTaskMutation();
  const edit = useAppSelector((state) => state.editWithSlice);
  const previousEdit = useAppSelector((state) => state.previousEditSlice);
  const dispatch = useAppDispatch();

  const toggleTodo = async (id: string) => {
    const completedTask = { ...todo, isCompleted: !todo.isCompleted };
    await isCompletedTask({ id, completedTask });
  };

  const editTodo = (id: string, text: string) => {
    dispatch(editTask(id));
    dispatch(previousEditTask(text));
  };

  return (
    <>
      {edit === todo.id ? (
        <div className={styles.inputForChange}>
          <EditLogging
            id={todo.id}
            value={previousEdit}
            note="Изменил таску:"
            teachMeUseHoc={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      ) : (
        <div
          className={`${styles.todo} ${
            todo.isCompleted ? styles.completedTodo : ""
          }`}
        >
          <RiAppleLine className={styles.appleImage} />
          <div className={styles.todoText}>{todo.title}</div>

          <CiEdit
            className={styles.editImage}
            onClick={() => editTodo(todo.id, todo.title)}
          />
          <div className={styles.deleteImage}>
            <DeleteLogging
              id={todo.id}
              text={todo.title}
              note="Удалил таску:"
              teachMeUseHoc={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>

          <MdDoneOutline
            className={styles.doneImage}
            onClick={() => toggleTodo(todo.id)}
          />
        </div>
      )}
    </>
  );
};

export default Todo;
