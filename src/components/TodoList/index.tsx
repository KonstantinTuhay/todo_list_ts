import { JSX } from "react";
import Todo from "../Todo/index.js";
import styles from "./index.module.css";
import { useGetToDosQuery } from "../../apiRQuery.js";

const TodoList = (): JSX.Element => {
  const { data, error, isLoading } = useGetToDosQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    if ("status" in error) {
      const errMsg =
        "error" in error ? error.error : JSON.stringify(error.data);

      return (
        <div>
          <div>An error has occurred:</div>
          <div>{errMsg}</div>
        </div>
      );
    }
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.TodoList}>
      {data?.length ? (
        data.map((todo) => <Todo key={todo.id} todo={todo} />)
      ) : (
        <h2>Todo list is empty</h2>
      )}
    </div>
  );
};

export default TodoList;
