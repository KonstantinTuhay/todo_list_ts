import React, { ChangeEvent, KeyboardEvent } from "react";
import withLogger from "../../helpers/withLogger";
import DeleteTodoLogger from "../DeleteTodoLogger";
import { RiAppleLine } from "react-icons/ri";
import { MdDoneOutline } from "react-icons/md";
import EditTodoLogger from "../EditTodoLogger";
import { CiEdit } from "react-icons/ci";
import { editTask } from "../redux/slices/editSlices";
import { previousEditTask } from "../redux/slices/previousEditSlice";
import { useDeleteToDoMutation } from "../../apiRQuery";
import { useIsCompletedTaskMutation } from "../../apiRQuery";
import { useIsUpdatedTaskMutation } from "../../apiRQuery";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import styles from "./index.module.css";

type Props = {
  todo: {
    title: string;
    id: string;
    isCompleted: boolean;
  };
};

const Todo = ({ todo }: Props): JSX.Element => {
  //когда типизируешь логгер, выскакивают ошибки, и уже когда повторил много где такую же
  // практически типизацию, они пропадают, кроме этого места
  const DeleteLogging = withLogger(DeleteTodoLogger);
  const EditLogging = withLogger(EditTodoLogger);
  const [deleteTask] = useDeleteToDoMutation();
  const [isCompletedTask] = useIsCompletedTaskMutation();
  const [isUpdatedTask, { isLoading }] = useIsUpdatedTaskMutation();

  const edit = useAppSelector((state) => state.editWithSlice);
  const previousEdit = useAppSelector((state) => state.previousEditSlice);
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  type Id = string;

  const deleteTodo = async (id: Id, teachMeUseHoc: () => void) => {
    await deleteTask(id);
    teachMeUseHoc();
  };

  const toggleTodo = async (id: Id) => {
    const completedTask = { ...todo, isCompleted: !todo.isCompleted };
    await isCompletedTask({ id, completedTask });
  };

  const editTodo = (id: Id, text: string) => {
    dispatch(editTask(id));
    dispatch(previousEditTask(text));
  };

  const handleChange = async (
    event: KeyboardEvent<HTMLInputElement>,
    id: Id,
    teachMeUseHoc: () => void
  ): Promise<void> => {
    if (event.key === "Enter") {
      teachMeUseHoc();
      const updatedTask = { title: previousEdit };
      await isUpdatedTask({ id, updatedTask });
      dispatch(editTask(null));
    }
  };

  return (
    <>
      {edit === todo.id ? (
        <div className={styles.inputForChange}>
          <EditLogging
            handleChange={handleChange}
            id={todo.id}
            value={previousEdit}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              dispatch(previousEditTask(event.target.value));
            }}
            note="Изменил таску:"
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
              deleteTodo={deleteTodo}
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
