import React from "react";
import TodoInput from "../../components/TodoInput";
import TodoList from "../../components/TodoList";
import Info from "../../components/InfoCircle";
import withLogger from "../../helpers/withLogger";
import "../../App.css";

const AllTodo: React.FC = (): JSX.Element => {
  const AddLogging = withLogger(TodoInput);

  return (
    <div className="App">
      <div>
        <h1>Your Todo App</h1>
        <Info />
      </div>
      <AddLogging note="Добавил таску:" />

      <TodoList />
    </div>
  );
};

export default AllTodo;
