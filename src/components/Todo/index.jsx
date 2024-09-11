import React from "react";
import styles from "./index.module.css";
import withLogger from "../../helpers/withLogger";
import DeleteTodoLogger from "../DeleteTodoLogger";
import { RiAppleLine } from "react-icons/ri";
import { MdDoneOutline } from "react-icons/md";
import EditTodoLogger from "../EditTodoLogger";
import { CiEdit } from "react-icons/ci";
import { editTask } from "../redux/slices/editSlices";
import { previousEditTask } from "../redux/slices/previousEditSlice";
import { useSelector, useDispatch } from "react-redux";
import { useDeleteToDoMutation } from "../../apiRQuery";
import { useIsCompletedTaskMutation } from "../../apiRQuery";
import { useIsUpdatedTaskMutation } from "../../apiRQuery";

const Todo = ({ todo }) => {
  const DeleteLogging = withLogger(DeleteTodoLogger);
  const EditLogging = withLogger(EditTodoLogger);
  const [deleteTask] = useDeleteToDoMutation();
  const [isCompletedTask] = useIsCompletedTaskMutation();
  const [isUpdatedTask, { isLoading }] = useIsUpdatedTaskMutation();

  const edit = useSelector((state) => state.editWithSlice);
  const previousEdit = useSelector((state) => state.previousEditSlice);
  const dispatch = useDispatch();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const deleteTodo = async (id, teachMeUseHoc) => {
    await deleteTask(id);
    teachMeUseHoc();
  };

  const toggleTodo = async (id) => {
    const completedTask = { ...todo, isCompleted: !todo.isCompleted };
    await isCompletedTask({ id, completedTask });
  };

  const editTodo = (id, text) => {
    dispatch(editTask(id));
    dispatch(previousEditTask(text));
  };

  const handleChange = async (event, id, teachMeUseHoc) => {
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
        <div>
          <EditLogging
            handleChange={handleChange}
            id={todo.id}
            className={styles.inputForChange}
            value={previousEdit}
            onChange={(e) => {
              dispatch(previousEditTask(e.target.value));
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
          <DeleteLogging
            className={styles.deleteImage}
            id={todo.id}
            text={todo.title}
            note="Удалил таску:"
            deleteTodo={deleteTodo}
          />

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
