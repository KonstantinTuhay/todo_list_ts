import React from "react";
import Todo from "../Todo";
import styles from "./index.module.css";
import { useGetToDosQuery } from "../../apiRQuery.js";

const TodoList = () => {
  const { data: tasks, error, isLoading } = useGetToDosQuery();
  console.log(tasks);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className={styles.TodoList}>
      {tasks.length === 0 && <h2>Todo list is empty</h2>}
      {tasks.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
