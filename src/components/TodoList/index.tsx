import React from "react";
import Todo from "../Todo/index.js";
import styles from "./index.module.css";
import { useGetToDosQuery } from "../../apiRQuery.js";

const TodoList: React.FC = (): JSX.Element => {
  // почему тут он ожидает два аргумента?
  // из за него непонятно как типизировать tasks и message
  const { data: tasks, error, isLoading } = useGetToDosQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  type Error = {
    message: string;
  };

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
